'use strict'

const buttonDs = document.getElementById('ds')

buttonDs.addEventListener('click', () => {
    const containerMain = document.querySelector('.containerImgMain')
    const containerCourses = document.querySelector('.choiceCourses')
    const sectionStudents = document.getElementById('students')

    sectionStudents.style.display = 'grid'

    containerMain.style.display = 'none'
    containerCourses.style.display = 'none'
})