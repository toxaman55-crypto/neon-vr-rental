'use client'

import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

const vrKids = '/vr/vr-kids.jpg'
const vrPoster = '/vr/vr-poster.jpg'
const vrTeam = '/vr/vr-team.jpg'

type Language = 'et' | 'ru' | 'en'

const copy = {
  et: {
    nav: ['Meist', 'Galerii', 'Broneerimine', 'Kontakt'],
    navIds: ['about', 'gallery', 'booking', 'contact'],
    heroLabel: 'VR-ÜRITUSED TALLINNAS',
    heroTitle: 'Sinu üritus.',
    heroAccent: 'Uus reaalsus.',
    heroText: 'Loome sünnipäevi, meeskonnaüritusi ja seiklusi, millest räägitakse veel kaua.',
    book: 'Broneeri elamus',
    explore: 'Vaata galeriid',
    statPlayers: 'mängijat korraga',
    statGames: 'VR-mängu',
    statSupport: 'juhendaja tugi',
    aboutKicker: 'ROHKEM KUI MÄNG',
    aboutTitle: 'Lõputult maailmu.',
    aboutText:
      'Meie vaba liikumisega VR-areen muudab iga ürituse ühiseks seikluseks. Kõik vajalik on meie poolt — varustusest kogenud juhendajani.',
    features: [
      ['Kõigile sobiv', 'Mängud algajatele ja kogenud mängijatele alates 8. eluaastast.'],
      ['Täielik vabadus', 'Juhtmevaba varustus ja suur mänguala kuni 4 osalejale.'],
      ['Turvaline kogemus', 'Juhendaja on kogu mängu vältel teie kõrval.'],
      ['Iga sündmuse jaoks', 'Sünnipäevad, firmaüritused, kooligrupid ja sõprade õhtud.'],
    ],
    galleryKicker: 'PÜÜA HETK',
    galleryTitle: 'Emotsioonid on päriselt.',
    galleryText: 'Vaata, kuidas virtuaalmaailm toob inimesed kokku.',
    galleryCaptions: ['Noored seiklejad', 'Meeskonnatöö uuel tasemel', 'Kõik ühise eesmärgi nimel'],
    bookingKicker: 'VALI OMA AEG',
    bookingTitle: 'Seiklus algab siit.',
    bookingText: 'Veebibroneerimine on ajutiselt välja lülitatud.',
    date: 'Kuupäev',
    time: 'Algusaeg',
    summary: 'Sinu broneering',
    duration: 'Kestus',
    durationValue: '60 minutit',
    price: 'Hind',
    priceValue: 'alates 40 €',
    name: 'Sinu nimi',
    phone: 'Telefon',
    submit: 'Saada päring',
    contactKicker: 'VÕTA ÜHENDUST',
    contactTitle: 'Kas oled valmis mängima?',
    contactText: 'Kirjuta või helista — aitame valida teie seltskonnale parima VR-elamuse. On võimalus individuaalseks väljasõiduks ja ürituse läbiviimiseks meie partnerite ruumides.',
    addressLabel: 'Asukoht',
    address: 'Tallinn, Eesti',
    hoursLabel: 'Avatud',
    hours: 'E–P 10:00–22:00',
    footer: 'VR-üritused, mida mäletad.',
  },
  ru: {
    nav: ['О продукте', 'Галерея', 'Календарь брони', 'Контакты'],
    navIds: ['about', 'gallery', 'booking', 'contact'],
    heroLabel: 'VR-МЕРОПРИЯТИЯ В ТАЛЛИННЕ',
    heroTitle: 'Ваше событие.',
    heroAccent: 'Новая реальность.',
    heroText: 'Создаём дни рождения, корпоративы и приключения, о которых говорят ещё долго.',
    book: 'Забронировать',
    explore: 'Смотреть галерею',
    statPlayers: 'игроков одновременно',
    statGames: 'VR-игр',
    statSupport: 'поддержка инструктора',
    aboutKicker: 'БОЛЬШЕ, ЧЕМ ИГРА',
    aboutTitle: 'Бесконечные миры.',
    aboutText:
      'Наша VR-арена со свободным перемещением превращает любое событие в общее приключение. Всё необходимое уже включено — от оборудования до опытного инструктора.',
    features: [
      ['Подходит каждому', 'Игры для новичков и опытных игроков от 8 лет.'],
      ['Полная свобода', 'Беспроводное оборудование и большая арена до 4-х участников.'],
      ['Безопасный опыт', 'Инструктор находится рядом на протяжении всей игры.'],
      ['Для любого события', 'Дни рождения, корпоративы, школьные группы и встречи друзей.'],
    ],
    galleryKicker: 'ЛОВИТЕ МОМЕНТ',
    galleryTitle: 'Эмоции — настоящие.',
    galleryText: 'Посмотрите, как виртуальный мир объединяет людей.',
    galleryCaptions: [
      'Юные исследователи',
      'Командная работа нового уровня',
      'Все ради общей цели',
    ],
    bookingKicker: 'ВЫБЕРИТЕ ВРЕМЯ',
    bookingTitle: 'Приключение начинается здесь.',
    bookingText: 'Онлайн-запись временно отключена.',
    date: 'Дата',
    time: 'Время начала',
    summary: 'Ваше бронирование',
    duration: 'Длительность',
    durationValue: '60 минут',
    price: 'Стоимость',
    priceValue: 'от 40 €',
    name: 'Ваше имя',
    phone: 'Телефон',
    submit: 'Отправить заявку',
    contactKicker: 'СВЯЖИТЕСЬ С НАМИ',
    contactTitle: 'Готовы играть?',
    contactText: 'Напишите или позвоните — подберём лучший VR-сценарий для вашей компании. Есть возможность индивидуального выезда и проведения мероприятия в помещениях наших партнёров. ',
    addressLabel: 'Адрес',
    address: 'Таллинн, Эстония',
    hoursLabel: 'Открыто',
    hours: 'Пн–Вс 10:00–22:00',
    footer: 'VR-события, которые запоминаются.',
  },
  en: {
    nav: ['About', 'Gallery', 'Book a time', 'Contacts'],
    navIds: ['about', 'gallery', 'booking', 'contact'],
    heroLabel: 'VR EVENTS IN TALLINN',
    heroTitle: 'Your event.',
    heroAccent: 'A new reality.',
    heroText: 'We create birthdays, team events and adventures people keep talking about.',
    book: 'Book an experience',
    explore: 'Explore gallery',
    statPlayers: 'players at once',
    statGames: 'VR games',
    statSupport: 'instructor support',
    aboutKicker: 'MORE THAN A GAME',
    aboutTitle: 'Endless worlds.',
    aboutText:
      'Our free-roam VR arena turns any event into a shared adventure. Everything is included — from the equipment to an experienced host.',
    features: [
      ['Made for everyone', 'Games for first-timers and experienced players aged 8+.'],
      ['Complete freedom', 'Wireless equipment and a large arena for up to 4 players.'],
      ['A safe experience', 'An instructor stays with you throughout the game.'],
      ['Any occasion', 'Birthdays, team events, school groups and nights with friends.'],
    ],
    galleryKicker: 'CATCH THE MOMENT',
    galleryTitle: 'The emotions are real.',
    galleryText: 'See how a virtual world brings real people together.',
    galleryCaptions: ['Young explorers', 'Teamwork, levelled up', 'Together towards one goal'],
    bookingKicker: 'CHOOSE YOUR TIME',
    bookingTitle: 'Your adventure starts here.',
    bookingText: 'Online booking is currently unavailable.',
    date: 'Date',
    time: 'Start time',
    summary: 'Your booking',
    duration: 'Duration',
    durationValue: '60 minutes',
    price: 'Price',
    priceValue: 'from €40',
    name: 'Your name',
    phone: 'Phone',
    submit: 'Send request',
    contactKicker: 'GET IN TOUCH',
    contactTitle: 'Ready to play?',
    contactText: 'Message or call us — we will find the perfect VR adventure for your group. There is a possibility of an individual trip and holding an event on our partners .',
    addressLabel: 'Location',
    address: 'Tallinn, Estonia',
    hoursLabel: 'Open',
    hours: 'Mon–Sun 10:00–22:00',
    footer: 'VR events worth remembering.',
  },
} as const

const languageNames: Record<Language, string> = { et: 'ET', ru: 'RU', en: 'EN' }
const times = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
const extraPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1642748355154-d76f7bd18f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600',
    credit: 'Salohiddin Kamolov',
  },
  {
    src: 'https://images.unsplash.com/photo-1552624189-5d5d9a1f6c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600',
    credit: 'Redd Francisco',
  },
  {
    src: 'https://images.unsplash.com/photo-1639323252699-23cd48cccea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600',
    credit: 'Jonathan Fors',
  },
]

function dateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function nextDateKey(date: Date) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + 1)
  return dateKey(nextDate)
}

function subscribeToClientDate() {
  return () => {}
}

function getClientDateKey() {
  return dateKey(new Date())
}

function getServerDateKey() {
  return ''
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Neon VR">
      <span className="logo-mark">
        <i />
        <i />
      </span>
      <span>
        NEON<span>VR</span>
      </span>
    </a>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const todayKey = useSyncExternalStore(
    subscribeToClientDate,
    getClientDateKey,
    getServerDateKey,
  )
  const today = useMemo(
    () => (todayKey ? new Date(`${todayKey}T12:00:00`) : null),
    [todayKey],
  )
  const [selectedDateOverride, setSelectedDateOverride] = useState('')
  const selectedDate = selectedDateOverride || (today ? nextDateKey(today) : '')
  const [selectedTime, setSelectedTime] = useState('16:00')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const t = copy[language]

  const locale = language === 'et' ? 'et-EE' : language === 'ru' ? 'ru-RU' : 'en-GB'
  const bookingEnabled = false

  const ui = {
    et: {
      participants: 'Osalejate arv',
      previous: 'Eelmine kuu',
      next: 'Järgmine kuu',
      bookingUnavailable: 'Veebibroneerimine on ajutiselt välja lülitatud.',
      galleryMore: ['VR-õhtu', 'Neoonmaailm', 'Uued elamused'],
      close: 'Sulge galerii',
      photo: 'Foto',
    },
    ru: {
      participants: 'Количество участников',
      previous: 'Предыдущий месяц',
      next: 'Следующий месяц',
      bookingUnavailable: 'Онлайн-запись временно отключена.',
      galleryMore: ['VR-вечер', 'Неоновый мир', 'Новые впечатления'],
      close: 'Закрыть галерею',
      photo: 'Фото',
    },
    en: {
      participants: 'Number of players',
      previous: 'Previous month',
      next: 'Next month',
      bookingUnavailable: 'Online booking is currently unavailable.',
      galleryMore: ['VR night', 'Neon world', 'New experiences'],
      close: 'Close gallery',
      photo: 'Photo',
    },
  }[language]

  const calendar = useMemo(() => {
    const weekdays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(2026, 0, 5 + index)
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).replace('.', '')
    })
    if (!today) return { label: '', weekdays, cells: [] }

    const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const leading = (month.getDay() + 6) % 7
    const latest = new Date(today)
    latest.setMonth(latest.getMonth() + 3)
    const cells: Array<{ key: string; day: number; disabled: boolean } | null> = Array.from(
      { length: leading },
      () => null,
    )

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(month.getFullYear(), month.getMonth(), day)
      const key = dateKey(date)
      cells.push({
        key,
        day,
        disabled: date < today || date > latest || !bookingEnabled,
      })
    }

    return {
      label: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(month),
      weekdays,
      cells,
    }
  }, [bookingEnabled, locale, monthOffset, today])

  const galleryImages = [
    { src: vrKids, caption: t.galleryCaptions[0], credit: '' },
    { src: vrTeam, caption: t.galleryCaptions[1], credit: '' },
    { src: vrPoster, caption: t.galleryCaptions[2], credit: '' },
    ...extraPhotos.map((photo, index) => ({
      ...photo,
      caption: ui.galleryMore[index],
    })),
  ]

  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(`${selectedDate}T12:00:00`))
    : ''

  useEffect(() => {
    if (lightbox === null) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowLeft') {
        setLightbox((current) =>
          current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setLightbox((current) => (current === null ? null : (current + 1) % galleryImages.length))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightbox, galleryImages.length])

  const goTo = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main id="top">
      <header className="header">
        <Logo />
        <nav className={mobileOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          {t.nav.map((item, index) => (
            <button key={item} onClick={() => goTo(t.navIds[index])}>
              {item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="languages" aria-label="Language selection">
            {(Object.keys(languageNames) as Language[]).map((item) => (
              <button
                className={language === item ? 'active' : ''}
                key={item}
                onClick={() => setLanguage(item)}
              >
                {languageNames[item]}
              </button>
            ))}
          </div>
          <button
            className={mobileOpen ? 'menu active' : 'menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-photo">
          <img src={vrTeam} alt="Friends playing together in a VR arena" />
        </div>
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="eyebrow">
            <span />
            {t.heroLabel}
          </p>
          <h1>
            {t.heroTitle}
            <br />
            <em>{t.heroAccent}</em>
          </h1>
          <p className="hero-copy">{t.heroText}</p>
          <div className="hero-buttons">
            <button className="button primary" onClick={() => goTo('booking')}>
              {t.book}
              <ArrowIcon />
            </button>
            <button className="button text-button" onClick={() => goTo('gallery')}>
              {t.explore}
            </button>
          </div>
        </div>
        <div className="stats">
          <div>
            <strong>4</strong>
            <span>{t.statPlayers}</span>
          </div>
          <div>
            <strong>30+</strong>
            <span>{t.statGames}</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>{t.statSupport}</span>
          </div>
        </div>
        <div className="scroll-line" />
      </section>

      <section className="about section" id="about">
        <div className="section-heading about-heading">
          <div>
            <p className="eyebrow">
              <span />
              {t.aboutKicker}
            </p>
            <h2>{t.aboutTitle}</h2>
          </div>
          <p>{t.aboutText}</p>
        </div>
        <div className="feature-grid">
          {t.features.map(([title, description], index) => (
            <article className="feature" key={title}>
              <span className="feature-number">0{index + 1}</span>
              <div className="feature-line" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span />
              {t.galleryKicker}
            </p>
            <h2>{t.galleryTitle}</h2>
          </div>
          <p>{t.galleryText}</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <button
              className={index === 0 ? 'gallery-large' : ''}
              key={image.src}
              type="button"
              onClick={() => setLightbox(index)}
              aria-label={`${ui.photo} ${index + 1}: ${image.caption}`}
            >
              <figure>
                <img src={image.src} alt={image.caption} />
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {image.caption}
                </figcaption>
              </figure>
            </button>
          ))}
        </div>
      </section>

      <section className="booking section" id="booking">
        <div className="booking-intro">
          <p className="eyebrow">
            <span />
            {t.bookingKicker}
          </p>
          <h2>{t.bookingTitle}</h2>
          <p>{t.bookingText}</p>
        </div>
        <div className="booking-card">
          <div className="field-group">
            <label>{t.date}</label>
            <div className="availability-tools">
              <p role="alert">{ui.bookingUnavailable}</p>
            </div>
            <div className="calendar-head">
              <button
                type="button"
                aria-label={ui.previous}
                disabled={monthOffset === 0}
                onClick={() => setMonthOffset((value) => Math.max(0, value - 1))}
              >
                ←
              </button>
              <strong>{calendar.label}</strong>
              <button
                type="button"
                aria-label={ui.next}
                disabled={monthOffset === 3}
                onClick={() => setMonthOffset((value) => Math.min(3, value + 1))}
              >
                →
              </button>
            </div>
            <div className="calendar-weekdays">
              {calendar.weekdays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="calendar-grid">
              {calendar.cells.map((date, index) =>
                date ? (
                  <button
                    type="button"
                    className={selectedDate === date.key ? 'selected' : ''}
                    disabled={date.disabled}
                    key={date.key}
                    onClick={() => setSelectedDateOverride(date.key)}
                  >
                    {date.day}
                  </button>
                ) : (
                  <span key={`empty-${index}`} />
                ),
              )}
            </div>
          </div>
          <div className="field-group">
            <label>{t.time}</label>
            <div className="time-row">
              {times.map((time) => (
                <button
                  type="button"
                  className={selectedTime === time ? 'selected' : ''}
                  disabled={!bookingEnabled}
                  onClick={() => setSelectedTime(time)}
                  key={time}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="booking-bottom">
            <div className="summary">
              <span>{t.summary}</span>
              <strong>
                {selectedDateLabel} · {selectedTime}
              </strong>
              <small>
                {t.duration}: {t.durationValue} &nbsp;·&nbsp; {t.price}: {t.priceValue}
              </small>
            </div>
            <div className="contact-fields">
              <input name="name" aria-label={t.name} placeholder={t.name} disabled />
              <input
                name="phone"
                aria-label={t.phone}
                placeholder={t.phone}
                type="tel"
                disabled
              />
              <input
                name="participants"
                aria-label={ui.participants}
                placeholder={ui.participants}
                type="number"
                min="1"
                max="10"
                defaultValue="4"
                disabled
              />
              <button className="button primary" type="button" disabled>
                {t.submit}
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryTitle}>
          <button
            className="lightbox-close"
            type="button"
            aria-label={ui.close}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            className="lightbox-arrow previous"
            type="button"
            aria-label={ui.previous}
            onClick={() =>
              setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length)
            }
          >
            ←
          </button>
          <figure>
            <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].caption} />
            <figcaption>
              <span>
                {String(lightbox + 1).padStart(2, '0')} / {galleryImages.length}
              </span>
              <strong>{galleryImages[lightbox].caption}</strong>
              {galleryImages[lightbox].credit && (
                <small>Unsplash · {galleryImages[lightbox].credit}</small>
              )}
            </figcaption>
          </figure>
          <button
            className="lightbox-arrow next"
            type="button"
            aria-label={ui.next}
            onClick={() => setLightbox((lightbox + 1) % galleryImages.length)}
          >
            →
          </button>
        </div>
      )}

      <section className="contact section" id="contact">
        <div className="contact-orbit orbit-one" />
        <div className="contact-orbit orbit-two" />
        <div className="contact-content">
          <p className="eyebrow">
            <span />
            {t.contactKicker}
          </p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <a className="contact-email" href="mailto:hello@neonvr.ee">
            hello@neonvr.ee
          </a>
          <a className="contact-phone" href="tel:+37255501234">
            +372 5550 1234
          </a>
        </div>
        <div className="contact-meta">
          <div>
            <span>{t.addressLabel}</span>
            <strong>{t.address}</strong>
          </div>
          <div>
            <span>{t.hoursLabel}</span>
            <strong>{t.hours}</strong>
          </div>
        </div>
      </section>

      <footer>
        <Logo />
        <p>{t.footer}</p>
        <span>{today ? `© ${today.getFullYear()} ` : ''}NEONVR</span>
      </footer>
    </main>
  )
}
