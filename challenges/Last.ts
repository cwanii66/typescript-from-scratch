type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1>
type tail2 = Last2<arr2>

/**
 * 实现一个通用Last<T>，
 * 它接受一个数组T并返回其最后一个元素的类型。
 */
type Last<T extends any[]> = [any, ...T][T["length"]] // construct a array and get the last element type
type Last2<T extends any[]> = T extends [... infer _, infer L] ? L : never
