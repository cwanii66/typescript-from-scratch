// never: bottom type
// unknown: top type
// any: both bottom and top type

interface Foo {
    type: 'foo'
}
interface Bar {
    type: 'bar'
}
type All = Foo | Bar // union type

function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            // val 在这里被收窄为Foo
            break;
        case 'bar':
            // val 在这里是Bar
            break;
        default:
            // val 在这里是never
            const exhaustiveCheck: never = val
            console.log(exhaustiveCheck);
            break;
    }
}