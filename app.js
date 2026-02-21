'use strict'

const containerStudents = document.querySelector('.containerStudents')
const sectionMain = document.querySelector('.containerImgMain')
const sectionCourses = document.querySelector('.choiceCourses')
const sectionStudents = document.getElementById('students')
const sectionProfile = document.getElementById('studentProfile')
const backIcon = document.getElementById('backPage')
const statusSpan = document.getElementById('status')
const statusLi = document.getElementById('liStatus')
const finalizadoLi = document.getElementById('liFinalizado')
const cursandoLi = document.getElementById('liCursando')
let currentSection = sectionMain

async function getCourses() {
    let url = `https://lion-school-backend.onrender.com/cursos`
    let response = await fetch(url)
    let courses = await response.json()

    courses.forEach(createCourse);
}

async function getStudents(id) {
    let url = `https://lion-school-backend.onrender.com/alunos?curso_id=${id}`
    let response = await fetch(url)
    let students = await response.json()

    return students
}

async function getStudent(id) {
    let url = `https://lion-school-backend.onrender.com/alunos/${id}`
    let response = await fetch(url)
    let student = await response.json()

    return student
}

function createCourse(course) {
    const sectionCourses = document.querySelector('.choiceCourses')
    const button = document.createElement('button')
    const img = document.createElement('img')
    const span = document.createElement('span')

    sectionCourses.appendChild(button)
    button.append(img, span)

    span.innerHTML = course.sigla
    img.src = './img/dsIcon.png'
    button.dataset.id = course.id

    button.classList.add('course')

    button.addEventListener('click', showStudentsCourse)
}

async function showStudentsCourse() {
    const buttonClicked = event.currentTarget

    sectionMain.classList.toggle('hiddeSection')
    sectionCourses.classList.toggle('hiddeSection')
    sectionStudents.classList.toggle('hiddeSection')


    let students = await getStudents(buttonClicked.dataset.id)
    cleanContainer(containerStudents)
    students.forEach(createStudent)
}

function createStudent(student) {
    const card = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')

    containerStudents.appendChild(card)
    card.append(img, span)

    img.src = student.foto
    span.innerHTML = student.nome
    card.dataset.idStudent = student.id

    card.classList.add('cardStudent')
    span.classList.add('name')

    card.addEventListener('click', showPofileUser)

    currentSection = sectionStudents
}

async function showPofileUser() {
    sectionStudents.classList.toggle('hiddeSection')
    sectionProfile.classList.toggle('hiddeSection')
    const student = event.currentTarget

    let dataStudent = await getStudent(student.dataset.idStudent)

    const imgProfile = document.querySelector('.dataStudent img')
    const nameProfile = document.querySelector('.dataStudent span')

    imgProfile.src = dataStudent.foto
    nameProfile.innerHTML = dataStudent.nome

    const notes = document.querySelector('.notes')
    cleanContainer(notes)
    dataStudent.desempenho.forEach(createNotes)

    currentSection = sectionProfile
}

function createNotes(dataClas) {
    const notes = document.querySelector('.notes')
    const containerNote = document.createElement('div')
    const note = document.createElement('span')
    const containerBar = document.createElement('div')
    const bar = document.createElement('div')
    const clas = document.createElement('span')

    notes.appendChild(containerNote)
    containerNote.append(note, containerBar, clas)
    containerBar.appendChild(bar)

    note.innerHTML = dataClas.valor
    bar.style.height = `${dataClas.valor}%`
    clas.innerHTML = dataClas.categoria

    containerNote.classList.add('containerNote')
    note.classList.add('note')
    containerBar.classList.add('containerBar')
    bar.classList.add('bar')
    clas.classList.add('nameClas')

    if (dataClas.valor <= 40) {
        note.style.color = '#C11010'
        bar.style.backgroundColor = '#C11010'

    } else if (dataClas.valor > 40 && dataClas.valor <= 70) {
        note.style.color = '#E5B657'
        bar.style.backgroundColor = '#E5B657'

    } else {
        note.style.color = '#3347B0'
        bar.style.backgroundColor = '#3347B0'
    }
}

function backPage() {
    if (currentSection.id == 'students') {
        sectionMain.classList.toggle('hiddeSection')
        sectionCourses.classList.toggle('hiddeSection')
        sectionStudents.classList.toggle('hiddeSection')

        currentSection = sectionMain

    } else if (currentSection.id == 'studentProfile') {
        sectionProfile.classList.toggle('hiddeSection')
        sectionStudents.classList.toggle('hiddeSection')

        currentSection = sectionStudents

    } else {


    }
}

function cleanContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

backIcon.addEventListener('click', backPage)

statusSpan.addEventListener('click', () => {
    const list = document.getElementById('listStatus')
    list.classList.toggle('hiddeSection')
})


const imgConfirm = document.querySelector('#liStatus img')
statusLi.addEventListener('click', () => {
    imgConfirm.style.transform = 'translateY(0px)'

})

finalizadoLi.addEventListener('click', () => {
    imgConfirm.style.transform = 'translateY(38px)'

})

cursandoLi.addEventListener('click', () => {
    imgConfirm.style.transform = 'translateY(76px)'

})

getCourses()