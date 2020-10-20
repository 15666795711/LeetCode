/**
 * 爬楼梯
 */
function climbStairs(n: number): number {
    let p:number = 0;
    let q:number = 0;
    let r:number = 1;
    for(let i=0;i<n;i++){
        p = q;
        q = r;
        r = p + q;
    }
    return r;
}
climbStairs(5)