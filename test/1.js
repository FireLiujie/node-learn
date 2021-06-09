let list1 = [{
        a: "1",
        b: "2"
    },
    {
        a: "3",
        b: "4"
    },
    {
        a: "5",
        b: "6"
    },
]

let list2 = [{
        a: "1",
        b: "2"
    },
    {
        a: "3",
        b: "4"
    },
]


let json = list1.concat(list2); //两个数组对象合并
let newJson = []; //盛放去重后数据的新数组
for(item1 of json){  //循环json数组对象的内容
	let flag = true;  //建立标记，判断数据是否重复，true为不重复
	for(item2 of newJson){  //循环新数组的内容
		if(item1.a==item2.a){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
			flag = false;
		}
	}
	if(flag){ //判断是否重复
		newJson.push(item1); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
	}
}
console.log("newJson",newJson);