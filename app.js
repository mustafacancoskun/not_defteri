const newJob = document.querySelector('.input-job');
const newJobBtn = document.querySelector('.btn-job-add');
const jobList = document.querySelector('.job-list');

newJobBtn.addEventListener('click', addJob);
jobList.addEventListener('click', jobDoneDelete);
document.addEventListener('DOMContentLoaded', getFromLocalStorage);


function jobDoneDelete(e) {
    const clickedObject = e.target;

    if (clickedObject.classList.contains('btn-success')) {
        clickedObject.parentElement.classList.toggle('job-done');
        clickedObject.parentElement.classList.toggle('opacity-50');
        clickedObject.classList.toggle('disabled');

    }

    if (clickedObject.classList.contains('btn-danger')) {

        if(confirm('Emin misiniz?')) {

            clickedObject.parentElement.classList.toggle('delete');
    
            const deletedJob = clickedObject.parentElement.children[0].innerText;
            deleteFromLocalStorage(deletedJob);
    
            clickedObject.parentElement.addEventListener('transitionend', function () {
                clickedObject.parentElement.remove();
            });
        }



    }
}


function addJob(e) {
    e.preventDefault();

    if (newJob.value.length > 0) {

        createJobItem(newJob.value)

        saveToLocalStorage(newJob.value);
        newJob.value = '';

    } else {
        alert('Görev kaydı boş bırakılamaz');
    }


}


function transformLocalStorageToArray() {
    let jobs;

    if (localStorage.getItem('jobs') === null) {
        jobs = [];

    } else {
        jobs = JSON.parse(localStorage.getItem('jobs'));
    }

    return jobs;
}


function saveToLocalStorage(newJob) {
    let jobs = transformLocalStorageToArray();



    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
}


function getFromLocalStorage() {
    let jobs = transformLocalStorageToArray();

    jobs.forEach(function (job) {
        createJobItem(job);
    })
}


function deleteFromLocalStorage(job) {
    let jobs = transformLocalStorageToArray();


    //splice ile item sil
    const indexOfDeletedJob = jobs.indexOf(job);
    console.log(indexOfDeletedJob);
    jobs.splice(indexOfDeletedJob, 1);

    localStorage.setItem('jobs', JSON.stringify(jobs));

}


function createJobItem(job) {
    // div oluşturma
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job-item', 'm-1', 'd-flex');

    //li olşuturma
    const jobDescription = document.createElement('li');
    jobDescription.classList.add('job-description', 'list-group-item', 'list-group-item-info', 'p-2', 'm-0');
    jobDescription.innerText = job;
    jobDiv.appendChild(jobDescription);


    //tamamlandı butonu 
    const jobDoneBtn = document.createElement('button');
    jobDoneBtn.classList.add('job-btn', 'btn', 'btn-success');
    jobDoneBtn.innerText = 'Yapıldı';
    jobDiv.appendChild(jobDoneBtn);

    // sil butonu
    const jobDeleteBtn = document.createElement('button');
    jobDeleteBtn.classList.add('job-btn', 'job-delete', 'btn', 'btn-danger');
    jobDeleteBtn.innerText = 'Sil';
    jobDiv.appendChild(jobDeleteBtn);


    // ulye divi ekleme
    jobList.appendChild(jobDiv);
}
















