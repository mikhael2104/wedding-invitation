AOS.init()

var tempMusic = ''
music = document.querySelector('.music')

if (tempMusic) {
    music.src = tempMusic
}

// door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')

    // set timeout music
    setTimeout(function () {
        // music play
        music.play()
        doorSection.css('transform-origin', '50% 650px')
        doorSection.css('transform', 'scale(6)')
    }, 600)

    // set timeout door
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

// button music
var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class ="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class = "fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

// countdown wedding
var countdownDate = new Date("August 29, 2025 10:00:00").getTime()

var x = setInterval(function () {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / (1000))

    document.getElementById("countdown-wedding").innerHTML = 
    `
    <div class="col-lg-1 col-3">
        <div class="text-center p-2 rounded text-light">
            <h5>${days}</h5> Hari
        </div>
    </div>
    <div class="col-lg-1 col-3">
        <div class="text-center p-2 rounded text-light">
            <h5>${hours}</h5> Jam
        </div>
    </div>
    <div class="col-lg-1 col-3">
        <div class="text-center p-2 rounded text-light">
            <h5>${minutes}</h5> Menit
        </div>
    </div>
    <div class="col-lg-1 col-3">
        <div class="text-center p-2 rounded text-light">
            <h5>${seconds}</h5> Detik
        </div>
    </div>
    `

    if (distance < 0) {
        clearInterval(x)
        document.getElementById('countdown-wedding').innerHTML = "<span class = 'text-center p-3 rounded text-light m-2'><h2>Sudah Dimulai!<h2></span>"
    }
}, 1000)

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')

namaSambutan.innerText = `${panggilan} ${nama},`

// copy text
function copyText(el) {
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement("textarea")

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()

    document.execCommand("copy")

    document.body.removeChild(temp)

    jQuery(el).text("Berhasil di Copy")

    setTimeout(function() {
        jQuery(el).html(`<i class="fas fa-reguler fa-copy"></i> Copy`)
    })
}

// rsvp
window.addEventListener("load", function() {
    const form = document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama Harus Diisi"
            })
            return;
        }

        if (status == 0) {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu"
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })

        fetch(action, {
            method: 'POST',
            body: data
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                text: "Konfirmasi Kehadiran Anda Berhasil Terkirim"
            })
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: error
            })
        })
        .finally(() =>{
            input.forEach(input => {
                input.disabled = false
            })
        })
    })
})