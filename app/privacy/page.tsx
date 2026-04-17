import Link from "next/link"

export const metadata = {
  title: "Политика конфиденциальности | СтампМастер",
  description: "Политика обработки персональных данных компании СтампМастер",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-accent transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-foreground">Политика конфиденциальности</span>
            </nav>
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Политика конфиденциальности
            </h1>
            <p className="text-muted">Последнее обновление: 15 января 2024 г.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-muted">
                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">1. Общие положения</h2>
                  <p>
                    Настоящая политика обработки персональных данных составлена в соответствии с
                    требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и
                    определяет порядок обработки персональных данных и меры по обеспечению
                    безопасности персональных данных, предпринимаемые ООО «СтампМастер» (далее —
                    Оператор).
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    2. Основные понятия, используемые в Политике
                  </h2>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>
                      <strong className="text-foreground">Персональные данные</strong> — любая
                      информация, относящаяся к прямо или косвенно определённому или определяемому
                      физическому лицу (субъекту персональных данных).
                    </li>
                    <li>
                      <strong className="text-foreground">Обработка персональных данных</strong> —
                      любое действие или совокупность действий, совершаемых с использованием средств
                      автоматизации или без их использования.
                    </li>
                    <li>
                      <strong className="text-foreground">Оператор</strong> — государственный орган,
                      муниципальный орган, юридическое или физическое лицо, организующие и (или)
                      осуществляющие обработку персональных данных.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    3. Категории обрабатываемых персональных данных
                  </h2>
                  <p className="mb-4">
                    Оператор может обрабатывать следующие персональные данные Пользователя:
                  </p>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>Фамилия, имя, отчество</li>
                    <li>Электронный адрес</li>
                    <li>Номера телефонов</li>
                    <li>Наименование организации</li>
                    <li>Должность</li>
                    <li>Данные о заказах и проектах</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    4. Цели обработки персональных данных
                  </h2>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>Обработка входящих запросов с целью консультирования</li>
                    <li>Подготовка коммерческих предложений и расчётов</li>
                    <li>Заключение и исполнение договоров</li>
                    <li>
                      Информирование Пользователя о новостях, акциях и услугах компании (с согласия
                      Пользователя)
                    </li>
                    <li>Улучшение качества обслуживания</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    5. Правовые основания обработки
                  </h2>
                  <p>
                    Оператор обрабатывает персональные данные Пользователя только в случае их
                    заполнения и/или отправки Пользователем самостоятельно через специальные формы,
                    расположенные на сайте. Заполняя соответствующие формы и/или отправляя свои
                    персональные данные Оператору, Пользователь выражает своё согласие с данной
                    Политикой.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    6. Порядок сбора, хранения и защиты данных
                  </h2>
                  <p className="mb-4">
                    Безопасность персональных данных обеспечивается путём реализации правовых,
                    организационных и технических мер:
                  </p>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>Использование защищённого протокола передачи данных (SSL/TLS)</li>
                    <li>Ограничение доступа к персональным данным</li>
                    <li>Регулярное обновление программного обеспечения</li>
                    <li>Обучение сотрудников правилам работы с персональными данными</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">7. Права пользователей</h2>
                  <p className="mb-4">Пользователь имеет право:</p>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>Получать информацию, касающуюся обработки его персональных данных</li>
                    <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                    <li>Отозвать согласие на обработку персональных данных</li>
                    <li>Обжаловать действия или бездействие Оператора</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-bold text-foreground">8. Контактная информация</h2>
                  <p>
                    По всем вопросам, связанным с обработкой персональных данных, вы можете
                    обратиться к нам:
                  </p>
                  <div className="mt-4 rounded-xl bg-surface p-6">
                    <p className="mb-2">
                      <strong className="text-foreground">ООО «СтампМастер»</strong>
                    </p>
                    <p>Адрес: г. Москва, ул. Промышленная, д. 15</p>
                    <p>
                      Email:{" "}
                      <a href="mailto:privacy@stampmaster.ru" className="text-accent hover:underline">
                        privacy@stampmaster.ru
                      </a>
                    </p>
                    <p>
                      Телефон:{" "}
                      <a href="tel:+74951234567" className="text-accent hover:underline">
                        +7 (495) 123-45-67
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
