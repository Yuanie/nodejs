// sign in:
// 注册和退出页面路由
let index = 0;
module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = ["聂", "彭", "刘", "林", "吴", "杨", "张", "李", "王", "秦"];
        let name = names[Math.random() * 10];
        ctx.render('signin.html', {
            name: `${name}某某`
        });
    },

    'POST /signin': async (ctx, next) => {
        index++;
        let name = ctx.request.body.name || '聂某某';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        // 没有进行hash加密
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        // cookies清空
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};