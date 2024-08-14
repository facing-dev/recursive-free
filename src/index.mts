export default function recursiveFree<TParam, TReturn>(rec: (params: TParam) => Generator<TParam, TReturn, TReturn>) {
    return function (param: TParam) {
        let stack = new Map<number, Generator<TParam, TReturn, TReturn>>
        stack.set(0, rec(param))
        let env = stack.get(0)
        let prevReturn: TReturn = null as any
        do {
            let ite = env!.next(prevReturn!)
            if (ite.done) {
                prevReturn = ite.value
                stack.delete(stack.size - 1)
            } else {
                stack.set(stack.size, rec(ite.value))
            }
            env = stack.get(stack.size - 1)
        } while (env)
        return prevReturn
    }
}