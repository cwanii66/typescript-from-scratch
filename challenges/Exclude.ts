type Result = OurExclude<'a' | 'b' | 'c', 'a'>

type OurExclude<T, U> = T extends U ? never : T
