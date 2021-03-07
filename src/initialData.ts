import feathers from '@feathersjs/feathers'

export const initData = (app: feathers.Application) => {
  ;[
    {
      id: 1,
      title: 'Hluboká práce',
      author: 'NEWPORT, Cal',
      info:
        'NEWPORT, Cal. Hluboká práce: pravidla pro soustředěný úspěch v roztěkaném světě. Brno: Jan Melvil Publishing, 2016. ISBN 978-80-7555-008-8.',
      created_at: '2021-01-03',
      updated_at: '2021-01-03',
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1473805818l/32033783._SY475_.jpg',
    },
    {
      id: 2,
      title: 'Lídři jedí poslední',
      author: 'SINEK, Simon',
      info:
        'SINEK, Simon. Lídři jedí poslední: proč některé týmy drží pohromadě a jiné se rozpadají. Brno: Jan Melvil, 2015. Žádná velká věda. ISBN 978-80-87270-89-9.',
      created_at: '2021-02-19',
      updated_at: null,
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1428305080l/25306207.jpg',
    },
    {
      id: 3,
      title: 'Přednášejte jako na TEDu',
      author: 'ANDERSON, Chris',
      info:
        'ANDERSON, Chris. Přednášejte jako na TEDu: oficiální průvodce veřejným vystupováním od kurátora konference TED. Přeložil Štěpán DŘÍMALKA. V Brně: Jan Melvil Publishing, 2016. Žádná velká věda. ISBN 978-80-7555-004-0.',
      created_at: '2021-01-19',
      updated_at: '2021-01-19',
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1475008270l/31301557.jpg',
    },
    {
      id: 4,
      title: 'Na čem dnes záleží',
      author: 'HAMEL, Gary',
      info:
        'HAMEL, Gary. Na čem dnes záleží: jak vyhrát ve světě neustálých změn, dravé konkurence a nezastavitelné inovace. Praha: PeopleComm, 2013. ISBN 978-80-904890-6-6.',
      created_at: '2021-02-19',
      updated_at: '2021-02-19',
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451424270l/28385279._SY475_.jpg',
    },
  ].forEach(book => app.service('books').create(book))
}
