/**
 * 通过提供一个函数SimpleVue（类似于Vue.extend或defineComponent），
 * 它应该正确地推断出 computed 和 methods 内部的this类型。
 * 在此挑战中，我们假设SimpleVue接受只带有data，computed和methods字段的Object作为其唯一的参数，
 * 
 * 1. data是一个简单的函数，它返回一个提供上下文this的对象，但是你无法在data中获取其他的计算属性或方法。
 * 2. computed是将this作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。
 * 3. methods是函数的对象，其上下文也为this。函数中可以访问data，computed以及其他methods中的暴露的字段。 
 *    computed与methods的不同之处在于methods在上下文中按原样暴露为函数。
 */
declare function SimpleVue<D, C, M>(
  options: {
    data: () => D,
    computed: C,
    methods: M,
  } & ThisType<D & M & GetComputed<C>>
): any

type GetComputed<C> = C extends Record<string, (...args: any[]) => any>
  ? { [S in keyof C]: ReturnType<C[S]> }
  : never

