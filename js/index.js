const loadPosts = async (api='https://openapi.programming-hero.com/api/retro-forum/posts') => {
    const res = await fetch(api);
    const data = await res.json();
    displayPostData(data.posts);
}
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPostData(data);
}

const displayPostData = (postData) => {
    const discussPosts = getElementById('discuss-posts');
    discussPosts.innerHTML = '';
    if (postData.length==0){
        discussPosts.innerHTML='<h1 class="text-red-500 mulish font-black text-5xl">No Post Found</h1>';
    }
    postData.forEach(post => {
        const postId = post.id;
        const postCategory = post.category;
        const authorImg = post.image;
        let isActive = 'bg-[#FF3434]';
        if(post.isActive) {
            isActive='bg-[#10B981]'
        }
        const postAuthor = post.author.name;
        const postTitle = post.title;
        const postDescription = post.description;
        const commentCount=post.comment_count;
        const viewCount=post.view_count;
        const postedTime=post.posted_time;
        const div=document.createElement('div');
        div.innerHTML=`
            <div
            class="flex flex-col lg:flex-row text-center lg:text-start gap-6 bg-[#F3F3F5] border-[1px] rounded-[24px] p-10">
                <div class="relative mx-auto lg:mx-0 size-[72px] rounded-2xl bg-white">
                    <img class="rounded-2xl w-full h-full" src="${authorImg}" alt="">
                    <span
                        class="absolute ${isActive} rounded-[50%] -top-1 -right-1 size-[18px] border-[2px] border-white "></span>
                </div>
                <div class="w-full">

                    <p class="text-sm font-medium text-[rgba(18,19,45,0.80)] flex flex-col lg:flex-row lg:gap-5 gap-2">#${postCategory} <span>Author : ${postAuthor}</span></p>

                    <h3 id="${postId}" class="my-4 mulish text-xl font-bold text-[#12132D]">${postTitle}</h3>

                    <p class="max-w-[569px] text-[rgba(18,19,45,0.60)]">${postDescription}</p>

                    <hr class="border-dashed border-t-[2px] my-5 border-[rgba(18,19,45,0.25)]">
                    <div class="flex flex-wrap justify-between">
                        <div class="text-[rgba(18,19,45,0.60)] flex gap-6 *:flex *:gap-3 *:items-center">
                            <li><img src="./icons/message.svg" alt="">${commentCount}</li>
                            <li><img src="./icons/eye.svg" alt="">${viewCount}</li>
                            <li><img src="./icons/clock.svg" alt="">${postedTime} min</li>
                        </div>
                        <button onclick="markRead('${postId}','${viewCount}')" class="btn-circle"><img src="./icons/email.svg" alt=""></button>
                    </div>
                </div>
            </div>
        `
        discussPosts.appendChild(div);
        
    });


}



const markRead = (id, view) => {
    const markRead=getElementById('mark-read');
    let readCount=parseInt(getElementById('read-count').innerText)+1;
    document.getElementById('read-count').innerText=readCount;
    const postTitle=getElementById(id).innerText
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-1 bg-white p-4 rounded-2xl mt-5">
            <p
                class="max-w-[212px] mx-auto lg:mx-0 text-center lg:text-start mulish font-semibold text-[#12132D]">
                ${postTitle}</p>
            <p class="text-[rgba(18,19,45,0.60)] mx-auto lg:mx-0 flex gap-2 items-center"><img src="./icons/eye.svg" alt="">${view}</p>
        </div>
    `
    markRead.appendChild(div);
};



const displayLatestPostData=(latestPostData)=>{
    const latestContainer=getElementById('latest-container');
    latestPostData.forEach(postData => {
        const coverImg=postData.cover_image;
        const profileImg=postData.profile_image;
        const title=postData.title;
        const description=postData.description;
        const author=postData.author;
        const authorName=author.name?author.name:'Unknown';
        const authorDesignation=author.designation?author.designation:'Unknown';
        const authorPostedDate=author.posted_date?author.posted_date:'No publish date';

        const div=document.createElement('div');
        div.innerHTML=`
            <div class="p-6 rounded-3xl border-[1px] border-[rgba(18,19,45,0.15)] max-w-[374px]">
                <div class="mx-auto max-h-[190px] max-w-[326px] bg-[rgba(18,19,45,0.05)] rounded-[20px]">
                    <img class="h-[190px] w-[326px] rounded-[20px]" src="${coverImg}" alt="">
                </div>
                <div class="flex flex-col">
                    <p class="text-start mt-6 flex items-center gap-2 text-[rgba(18,19,45,0.60)] mulish"><img src="./icons/calendar.svg" alt="">${authorPostedDate}</p>
                    <h3 class="mt-4 mb-3 mulish text-lg font-extrabold">${title}</h3>
                    <p class="mulish text-[rgba(18,19,45,0.60)]">${description}</p>
                    <div class="flex gap-4 mt-4">
                        <img class="size-11 rounded-[44px]" src="${profileImg}" alt="">
                        <p class="flex text-start flex-col mulish text-[rgba(18,19,45,0.60)]">
                            <span class="font-bold text-[#12132D]">${authorName}</span>
                            ${authorDesignation}
                        </p>
                    </div>
                </div>
            </div>
        `
        latestContainer.appendChild(div);
    });
};


const searchPosts = ()=> {
    const inputFieldValue = getElementById('input-field').value.toLowerCase();
    loadPosts(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputFieldValue}`);
    document.getElementById('discuss-posts').classList.add('hidden');
    document.getElementById('spinner').classList.remove('hidden');
    spinnerLoading();
}

loadLatestPosts();
loadPosts();


const getElementById = (id) => {
    return document.getElementById(id);
};



// spinner loading
const spinnerLoading =() => {
    const spinnerElement=getElementById('spinner');
    const discussPosts=getElementById('discuss-posts');
    setTimeout(() => {
        spinnerElement.classList.add('hidden');
        discussPosts.classList.remove('hidden'); 
    }, 2000);
};
spinnerLoading();

const spinnerLoading2 =() => {
    const spinnerElement=getElementById('spinner1');
    const latestContainer=getElementById('latest-container');
    setTimeout(() => {
        spinnerElement.classList.add('hidden');
        latestContainer.classList.remove('hidden'); 
    }, 2000);
};
spinnerLoading2();