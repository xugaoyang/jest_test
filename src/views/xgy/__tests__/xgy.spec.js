import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import HelloWorld from '@/components/HelloWorld'
import fetchData from '@/services/__mocks__/api'
import fetchListData from '@/services/api'
import TestComponent from '../testComponent'
import ChildComponent from '../Child'
import ProgressBar from '../ProgressBar'
import ItemList from '../ItemList'
import Item from '../Item'
import Form from '../Form'

jest.mock('@/services/api.js')

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

let citys = ['vienna', 'beijing', 'shenzhen', 'tokyo']

function isCity(city) {
  return citys.includes(city)
}

function initializeCityDatabase() {
  citys = ['Vienna', 'Beijing', 'Shenzhen', 'Tokyo']
}

function clearCityDataBase() {
  citys = []
}

beforeEach(() => {
  initializeCityDatabase()
  // console.log('开始测试前 看下城市数据', citys)
  jest.useFakeTimers()
})

afterEach(() => {
  clearCityDataBase()
  // console.log('测试跑完咯 看下城市数据', citys)
})

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy()
})

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeFalsy()
})

describe('test city whether in city list', () => {
  beforeEach(() => {
    // console.log('beforeEach test in describe')
  })
  afterEach(() => {
    // console.log('afterEach test in describe')
  })
  test('city database has Shenzhen', () => {
    expect(isCity('Shenzhen')).toBeTruthy()
  })
})

// mock test
const myMock = jest.fn()
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true)

// platform

// const diff = require('jest-diff').default

// const a = {a:{b:{c:5}}}
// const b = {a:{b:{c:6}}}
// const result = diff(a,b)

// console.log(result)
// diff is not a function

// assertions

test('doAsync calls both callbacks', () => {
  expect.assertions(2)
  function doAsync(fn1, fn2) {
    fn1(true)
    fn2(true)
  }
  function cb1(data) {
    expect(data).toBeTruthy()
  }
  function cb2(data) {
    expect(data).toBeTruthy()
  }
  doAsync(cb1, cb2)
})

// dom属性测试
describe('test item testprop', () => {
  test('test TestComponent prop', () => {
    const wrapper = shallowMount(TestComponent)
    expect(wrapper.findComponent(ChildComponent).props().testProp).toBe('some-value')
  })
  test('a href test', () => {
    const wrapper = shallowMount(TestComponent)
    expect(wrapper.find('a').attributes().href).toBe('https://www.baidu.com')
    expect(wrapper.find('a').element.style.color).toBe('red')
  })
})
// 方法测试
describe('test component methods', () => {
  test('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden')
    wrapper.vm.start()
    // TODO:re-check result，run failed
    expect(wrapper.classes()).not.toContain('hidden')
  })
  test('set the bar to 100% when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    // TODO:re-check result，run failed
    expect(wrapper.element.style.width).toBe('100%')
  })
  test('hides the bar when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(wrapper.classes()).toContain('hidden')
  })
  test('reset to 0% width when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    expect(wrapper.find('div').element.style.width).toBe('0%')
  })
  test('increase width by 1% every 100ms after start call', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    jest.runTimersToTime(100)
    // TODO:re-check result，run failed
    expect(wrapper.find('div').element.style.width).toBe('1%')
    jest.runTimersToTime(900)
    expect(wrapper.find('div').element.style.width).toBe('10%')
    jest.runTimersToTime(3000)
    expect(wrapper.find('div').element.style.width).toBe('40%')
  })

  test('clear timer when finish is called', () => {
    jest.spyOn(window, 'clearInterval')
    setInterval.mockReturnValue(123)
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(window.clearInterval).toHaveBeenCalledWith(123)
  })
})

// 父子组件方法调用测试
describe('test component method emit', () => {
  test('comp-child emit to comp-parent', () => {
    const wrapper = shallowMount(ItemList)
    // const child = shallowMount(ChildComponent)
    // child.find('button').trigger('click')
    // expect(child.emitted('childEmitParent')).toHaveLength(1)
    wrapper.findComponent(ChildComponent).vm.$emit('childEmitParent')
    expect(wrapper.vm.msg).toBe('hide')
    expect(wrapper.find('.text').text()).toBe('hide')
    expect(wrapper.findComponent(ChildComponent).exists()).toBeFalsy()
  })
})

// 表单测试
describe('test form submit', () => {
  test('input name validate', () => {
    const wrapper = shallowMount(Form)
    wrapper.find('input[type="text"]').setValue('zhangsan')
    wrapper.find('input[type="text"]').trigger('change')
    expect(wrapper.find('input[type="text"]').element.value).toContain('zhangsan')
  })
  test('input pwd validate', () => {
    const wrapper = shallowMount(Form)
    wrapper.find('input[type="password"]').setValue('luoxiang')
    wrapper.find('input[type="password"]').trigger('change')
    expect(wrapper.find('input[type="password"]').element.value).toBe('luoxiang')
  })
  test('input checkbox validate', () => {
    const wrapper = shallowMount(Form)
    wrapper.find('input[type="checkbox"]').setChecked()
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true)
  })
  test('test submit form', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallowMount(Form, {
      mocks: {
        axios
      }
    })
    wrapper.find('input[type="text"]').setValue('zhangsan')
    wrapper.find('input[type="password"]').setValue('luoxiang')
    wrapper.find('input[type="checkbox"]').setChecked()
    wrapper.find('button').trigger('click')
    const expectedData = expect.objectContaining({
      name: 'zhangsan'
    })
    expect(axios.post).toHaveBeenCalledWith('http://www.baidu.com', expectedData)
  })
})

// mock测试
describe('test mock function', () => {
  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {

      }
    }
    shallowMount(ItemList, { mocks: { $bar } })
    expect($bar.start).toHaveBeenCalledTimes(1)
  })
  // 异步测试
  test('fetch data', async () => {
    expect.assertions(1)
    const data = await fetchData()
    expect(data).toEqual([])
    // expect(data).toContain([]) // failed, TODO:期望值的api比较
    // expect(data).toBe([]) // received:serilizes to the same string
  })
  test('await promise', async () => {
    expect.assertions(1)
    let hasResolved = false
    Promise.resolve().then(() => {
      hasResolved = true
    })
    await flushPromises()
    expect(hasResolved).toBe(true)
  })
  test('render an item width data for each item', async () => {
    expect.assertions(4)
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    // TODO: search api [mockResolveValueOnce]
    fetchListData.mockResolvedValueOnce(items)
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    const Items = wrapper.findAllComponents(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapperItem, i) => {
      expect(wrapperItem.vm.item).toContain(items[i])
    })
  })
  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()
  })
})

// vuex测试

// vue-router测试
