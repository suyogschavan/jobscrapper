chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) =>{
    if(request.type == "check_login_status"){
        console.log("Check signin received");
        let d = document.querySelector(".global-nav__primary-link").getAttribute('href');
        if(d.startsWith("https://www.linkedin.com/feed")){
            console.log("You're Logged in");
            sendResponse({status: true});
        } else {
            console.log("You're not Logged in");
            sendResponse({isLoggedIn: false});
        }
    }
    
    if(request.action == "startScraping"){
        // console.log("Scrapping is started");

        const allTitles = document.getElementsByClassName("disabled ember-view job-card-container__link job-card-list__title");
        const allCompanies = document.getElementsByClassName("job-card-container__primary-description");
        const allLocations= document.getElementsByClassName("job-card-container__metadata-item");
        // const allLinks= document.getElementsByClassName("disabled ember-view job-card-container__link job-card-list__title");
        
        const titles = [];
        const companys= [];
        const locations= [];
        const links=[];

        for(let i=0; i<allTitles.length; i++){
            titles.push(allTitles[i].innerText);
            companys.push(allCompanies[i].innerText);
            locations.push(allLocations[i].innerText);  
            links.push(allTitles[i].href);
        }

        const jobs = [];
        
        for(let i=0; i<titles.length; i++){
            const jobData = {
                title: titles[i],
                company: companys[i],
                location: locations[i],
                link: links[i]
            };
            jobs.push(jobData);
        }

        console.log(jobs);

        chrome.runtime.sendMessage({type: 'JOB_DATA', data:jobs});
        sendResponse({success:true, size:jobs.length});
    }
})
