# VitaCore — Design System & Figma Make Prompts

> Этот документ — ТЗ для дизайна мобильного приложения.
> Используется как источник промтов для Figma Make.
> Фронт: React Native + Expo, навигация: React Navigation v6, стейт: Zustand.

---

## 1. Цветовая палитра

### Brand Colors

| Токен | Hex | Где используется |
|-------|-----|-----------------|
| `brand-100` | `#ddefb5` | Заливка карточек, фоны секций, soft highlight |
| `brand-300` | `#9fd526` | Кнопки, иконки активного таба, progress bars |
| `brand-500` | `#d3ff55` | Неоновый акцент (dark theme), hover/press, CTA кнопки |
| `brand-700` | `#6ba000` | Pressed state кнопок, dark theme text on brand bg |

### Light Theme

| Токен | Hex | Назначение |
|-------|-----|-----------|
| `bg-primary` | `#FFFFFF` | Основной фон экрана |
| `bg-secondary` | `#F6F7F4` | Фон секций, группировки карточек |
| `bg-tertiary` | `#ECEEE8` | Input fields фон, disabled states |
| `surface` | `#FFFFFF` | Карточки, модалки (с тенью) |
| `surface-elevated` | `#FFFFFF` | Bottom sheet, dropdown (elevation 2) |
| `text-primary` | `#1A1A1A` | Заголовки, основной текст |
| `text-secondary` | `#6B6B6B` | Подписи, hints, secondary info |
| `text-tertiary` | `#9E9E9E` | Placeholder, disabled text |
| `text-on-brand` | `#1A1A1A` | Текст поверх brand кнопок |
| `border` | `#E5E5E5` | Разделители, бордеры input |
| `border-focus` | `#9fd526` | Фокус input, активный бордер |
| `icon-primary` | `#1A1A1A` | Основные иконки |
| `icon-secondary` | `#9E9E9E` | Неактивный таб, hint иконки |
| `icon-active` | `#9fd526` | Активный таб, selected state |
| `error` | `#E53935` | Ошибки, destructive |
| `warning` | `#FB8C00` | Предупреждения |
| `success` | `#43A047` | Успех, confirmed |
| `info` | `#1E88E5` | Информационные |
| `overlay` | `rgba(0,0,0,0.4)` | Backdrop модалки, bottom sheet |

### Dark Theme

| Токен | Hex | Назначение |
|-------|-----|-----------|
| `bg-primary` | `#0A0A0A` | Основной фон (почти чёрный) |
| `bg-secondary` | `#141414` | Фон секций |
| `bg-tertiary` | `#1E1E1E` | Input fields фон |
| `surface` | `#1A1A1A` | Карточки (без тени, lighter bg) |
| `surface-elevated` | `#242424` | Bottom sheet, dropdown |
| `text-primary` | `#F5F5F5` | Заголовки |
| `text-secondary` | `#A0A0A0` | Подписи |
| `text-tertiary` | `#666666` | Placeholder |
| `text-on-brand` | `#0A0A0A` | Текст на brand кнопках (тёмный!) |
| `border` | `#2A2A2A` | Разделители |
| `border-focus` | `#d3ff55` | Фокус input |
| `icon-primary` | `#F5F5F5` | Основные иконки |
| `icon-secondary` | `#666666` | Неактивные |
| `icon-active` | `#d3ff55` | Активный таб (неон) |
| `error` | `#EF5350` | Ошибки |
| `warning` | `#FFA726` | Предупреждения |
| `success` | `#66BB6A` | Успех |
| `info` | `#42A5F5` | Инфо |
| `overlay` | `rgba(0,0,0,0.6)` | Backdrop |

### Градиенты

```
brand-gradient:      linear(135deg, #9fd526 → #d3ff55)     — CTA кнопки, hero секции
dark-card-gradient:  linear(180deg, #1A1A1A → #141414)     — карточки в dark mode
```

---

## 2. Типографика

Шрифт: **Inter** (бесплатный, отлично рендерится на обеих платформах, есть в Google Fonts + Expo).

| Стиль | Размер | Weight | Line Height | Где |
|-------|--------|--------|------------|-----|
| `h1` | 28px | Bold (700) | 34px | Заголовок экрана ("Dashboard") |
| `h2` | 22px | SemiBold (600) | 28px | Секция карточки ("Daily Meals") |
| `h3` | 18px | SemiBold (600) | 24px | Подзаголовок ("Breakfast") |
| `body-lg` | 16px | Regular (400) | 22px | Основной текст |
| `body-md` | 14px | Regular (400) | 20px | Карточки, списки |
| `body-sm` | 12px | Regular (400) | 16px | Hints, timestamps |
| `label` | 14px | Medium (500) | 18px | Кнопки, табы, labels |
| `caption` | 11px | Medium (500) | 14px | Badge, мелкие подписи |
| `number-lg` | 32px | Bold (700) | 38px | Большие числа (1200 KCal) |
| `number-md` | 20px | SemiBold (600) | 26px | Средние числа (45g) |

---

## 3. Сетка и отступы

```
Screen padding:     16px (горизонтальный)
Card padding:       16px внутри
Section gap:        24px между секциями
Card gap:           12px между карточками
Element gap:        8px внутри карточки
Border radius:
  card:             16px
  button:           12px
  input:            12px
  chip/tag:         20px (pill)
  avatar:           999px (круг)
  bottom-sheet:     24px top
  modal:            20px

Tab bar height:     60px + safe area
Header height:      56px
```

---

## 4. Компоненты — спецификации для Figma Make

> Каждый компонент описан как промт-инструкция.

### 4.1 Bottom Tab Bar

```
LIGHT: Белый фон (#FFFFFF), верхний border 1px #E5E5E5.
  5 иконок в ряд, равномерно. Неактивные: #9E9E9E. Активная: #9fd526 с
  точкой-индикатором 4px под иконкой. Label под иконкой 11px Medium.
  Высота 60px + safe area bottom padding.

DARK: Фон #141414, верхний border 1px #2A2A2A.
  Неактивные иконки: #666666. Активная: #d3ff55 с точкой-индикатором.
  Те же размеры.
```

### 4.2 Header / App Bar

```
LIGHT: Фон transparent (bg-primary просвечивает). Слева: текст-заголовок
  экрана (h1, #1A1A1A). Справа: иконка колокольчика 24px #1A1A1A.
  Если есть непрочитанные — красный badge (8px круг) в правом верхнем углу
  колокольчика. Высота 56px.

DARK: То же, текст #F5F5F5, иконка #F5F5F5, badge тот же красный.
```

### 4.3 Кнопки

```
PRIMARY (CTA):
  Light: фон #9fd526, текст #1A1A1A, 14px Medium. Border-radius 12px.
         Padding 14px vertical, 24px horizontal. Без тени.
         Pressed: фон #6ba000.
  Dark:  фон #d3ff55, текст #0A0A0A. Pressed: #9fd526.

SECONDARY:
  Light: фон transparent, border 1.5px #9fd526, текст #9fd526. Radius 12px.
         Pressed: фон #ddefb5.
  Dark:  border 1.5px #d3ff55, текст #d3ff55. Pressed: фон rgba(211,255,85,0.1).

GHOST / TEXT:
  Light: без фона, без border. Текст #9fd526 14px Medium. Pressed: фон #F6F7F4.
  Dark:  текст #d3ff55. Pressed: фон #1A1A1A.

DESTRUCTIVE:
  Light: фон #E53935, текст #FFFFFF. Pressed: #C62828.
  Dark:  фон #EF5350, текст #FFFFFF. Pressed: #E53935.

DISABLED (любой тип):
  Light: фон #ECEEE8, текст #9E9E9E.
  Dark:  фон #1E1E1E, текст #666666.

Размеры: Large (52px height), Medium (44px), Small (36px).
Full-width: растянуть на 100% - 32px (screen padding).
С иконкой: иконка 20px слева от текста, gap 8px.
```

### 4.4 Input / Text Field

```
LIGHT: Фон #F6F7F4, border 1.5px #E5E5E5, radius 12px. Padding 14px 16px.
  Placeholder: #9E9E9E 14px. Текст ввода: #1A1A1A 16px.
  Focused: border #9fd526, фон #FFFFFF.
  Error: border #E53935, message красным 12px под полем.
  Label сверху: #6B6B6B 12px Medium, margin-bottom 6px.

DARK: Фон #1E1E1E, border 1.5px #2A2A2A. Placeholder: #666666. Текст: #F5F5F5.
  Focused: border #d3ff55, фон #141414.
  Error: border #EF5350.
```

### 4.5 Карточка (Card)

```
LIGHT: Фон #FFFFFF, border-radius 16px, shadow: 0 2px 8px rgba(0,0,0,0.06).
  Padding 16px. Без border.

DARK: Фон #1A1A1A, border-radius 16px, без тени. Border 1px #2A2A2A
  (subtle, для разделения). Padding 16px.

Варианты:
  - Простая (информация)
  - С прогрессом (circular или linear progress bar)
  - С иконкой слева (48px icon container с bg brand-100/brand-dark)
  - Со стрелкой справа (>) — навигационная
  - С замочком (🔒) — feature locked by subscription
```

### 4.6 Bottom Sheet / Modal

```
LIGHT: Фон #FFFFFF, top border-radius 24px. Handle bar: 36x4px #E5E5E5,
  centered, margin-top 8px. Backdrop: rgba(0,0,0,0.4). Padding 16px.

DARK: Фон #1A1A1A, handle bar #2A2A2A. Backdrop: rgba(0,0,0,0.6).

Анимация: slide up, spring physics.
Размеры: small (30% экрана), medium (50%), large (85%).
```

### 4.7 Select / Dropdown

```
Тригер: выглядит как Input с иконкой chevron-down справа.
Открытие: Bottom Sheet (medium) со списком опций.
Каждая опция: 48px высота, текст 16px, padding 16px horizontal.
Selected: фон brand-100 (light) / rgba(211,255,85,0.1) (dark),
  галочка справа цвета brand.
Multi-select: checkbox слева вместо галочки.
```

### 4.8 Chips / Tags

```
LIGHT: Фон #F6F7F4, border-radius 20px (pill), padding 6px 14px.
  Текст 12px Medium #6B6B6B. Selected: фон #ddefb5, текст #1A1A1A, border #9fd526.

DARK: Фон #1E1E1E, текст #A0A0A0.
  Selected: фон rgba(211,255,85,0.15), текст #d3ff55, border #d3ff55.
```

### 4.9 Progress Indicators

```
Circular (как КБЖУ на рефе):
  Размер: 80px (large), 48px (medium), 32px (small).
  Track: #ECEEE8 (light) / #2A2A2A (dark), 6px thick.
  Fill: #9fd526 (light) / #d3ff55 (dark), 6px thick, rounded cap.
  Центр: число bold.

Linear:
  Высота: 6px, radius 3px.
  Track: #ECEEE8 / #2A2A2A. Fill: brand gradient.
```

### 4.10 Avatar

```
Размеры: 24px (tiny), 32px (small), 40px (medium), 56px (large), 80px (xl).
Border-radius: full circle. Border: 2px #FFFFFF (light) / #1A1A1A (dark).
Placeholder (нет фото): фон #ddefb5, инициалы #6ba000, bold.
Online indicator: 10px зелёный круг (#43A047) с белым border 2px,
  позиция bottom-right.
```

### 4.11 Badge / Counter

```
Notification badge: красный (#E53935) круг, мин 18px, текст 11px white bold.
  На колокольчике — позиция top-right, смещение -4px.
Tab badge: зелёная точка 6px без текста (brand-300).
Subscription lock: серый замочек 16px в правом верхнем углу карточки.
```

### 4.12 Toast / Snackbar

```
LIGHT: Фон #1A1A1A, текст #FFFFFF, radius 12px. Иконка слева (success/error/info).
  Позиция: снизу, 16px от tab bar. Auto-dismiss 3s.

DARK: Фон #2A2A2A, текст #F5F5F5. Те же правила.
```

### 4.13 Calendar (Week Strip)

```
Горизонтальная полоса дней недели (Mon-Sun), скроллится.
Каждый день: 44px width, column center.
  Верх: буква дня 12px secondary.
  Низ: число 16px.
  Сегодня: число в круге brand-300 (light) / brand-500 (dark), текст white/dark.
  С событиями: точка 4px brand под числом.
```

### 4.14 Subscription Lock Overlay

```
Для функций заблокированных подпиской.
Карточка отображается нормально, но с overlay:
  - Opacity 0.5 на контенте
  - Иконка замочка 24px по центру, поверх
  - При тапе: bottom sheet "Unlock with Standard plan" с кнопкой upgrade
```

### 4.15 Role Switcher (Long Press on Profile Tab)

```
Bottom Sheet (small):
  Заголовок: "Switch Role" 18px SemiBold
  Список ролей:
    Каждая роль: 56px row, аватар 40px слева, название роли + тип (14px secondary)
    Текущая роль: brand bg, галочка справа
    Доступные: обычный фон
    Недоступные (не добавлена роль): серая, текст "Add role →"
  Пример:
    [avatar] User (active) ✓
    [avatar] Trainer
    [avatar] + Add specialist role →
```

---

## 5. Навигация — Screen Map

### 5.1 User Context — 5 tabs

```
[Dashboard] [Nutrition] [Calendar] [Map] [Profile]

Dashboard
  ├── Calories Today (circular progress + macros)
  ├── Today's Appointments (карточки)
  ├── Quick Actions (log meal, find specialist, book)
  └── Weekly Summary (mini chart)

Nutrition
  ├── Day selector (week strip)
  ├── KBJU summary bar (4 circular progress)
  ├── Meals list (Breakfast → Lunch → Dinner → Snack)
  │   └── Food item → Food Detail screen
  ├── + Add meal (FAB)
  ├── Search food (top search bar)
  └── Barcode scanner button

Calendar
  ├── Month/Week/Day toggle
  ├── Events aggregation (appointments, sessions, reminders)
  ├── Color-coded layers toggle
  └── + Quick add event

Map
  ├── Mapbox map (full screen)
  ├── Search bar overlay top
  ├── Filter chips (gym, clinic, trainer, masseur)
  ├── Specialist/venue pins
  └── Bottom card on pin tap → detail

Profile
  ├── Avatar + name + email
  ├── Goal badges (weight_loss, muscle_gain...)
  ├── Body metrics summary (weight chart)
  ├── My Specialists (team)
  ├── Privacy settings
  ├── Subscription (current plan + upgrade)
  ├── Theme toggle (System / Light / Dark)
  ├── Language (UK / EN)
  ├── Notifications settings
  └── Logout / Delete account
  [Long press → Role Switcher bottom sheet]
```

### 5.2 Specialist Context — 4 tabs

```
[Dashboard] [Clients] [Calendar] [Profile]

Dashboard
  ├── Today's schedule (timeline view)
  ├── Pending requests (appointment requests to confirm)
  ├── Quick stats (clients, sessions this week)
  └── Next appointment card

Clients
  ├── Client list (search + filter)
  ├── + Invite client
  └── Client detail →
      ├── Contact info
      ├── Nutrition context (if permitted)
      ├── Session history
      ├── Body metrics graph (if permitted)
      └── Cycle phase indicator (if permitted)

Calendar
  ├── Week view (primary)
  ├── Day view with time slots
  ├── Working hours blocks (green)
  ├── Blocked time (grey)
  ├── Appointments (cards on timeline)
  └── + Block time / + Create appointment

Profile (Specialist)
  ├── Public profile preview
  ├── Bio, photo, services editor
  ├── Certifications
  ├── Venue link
  ├── Availability status (available / busy / on_leave)
  ├── Subscription (specialist plan)
  ├── Schedule settings (working hours)
  └── [Long press → Role Switcher]
```

### 5.3 Shared Screens (обе роли)

```
Onboarding:
  1. Welcome (brand splash + tagline)
  2. Feature highlights (3 slides swipe)
  3. Register (email + password / OAuth Apple / OAuth Google)
  4. Choose role (User by default, + add Specialist)
  5. Fill profile (name, birth_date, goals, activity_level)

Notifications (from bell icon):
  List of notifications grouped by date
  Each: icon + title + body + time + read/unread indicator
  Swipe left → mark read / delete
  Action buttons on some (Confirm / Cancel appointment)

Specialist Public Profile (viewed by user):
  Hero photo carousel
  Name, types[], rating, review count
  Services list with prices
  Certifications
  Venue link
  Available slots (day picker + time slots)
  Reviews list
  Book button (sticky bottom)

Appointment Detail:
  Status indicator (pending → confirmed → completed)
  Specialist info card
  Date/time, duration, venue
  Action buttons (Cancel / Reschedule)

Session (Live — specialist):
  Timer running
  Exercise/procedure logging
  Real-time data input
  Notes field
  Complete button

Food Detail:
  Food photo (if available)
  Serving size adjuster (+/-)
  KBJU breakdown (Protein / Carbs / Fat / Vitamins)
  Total nutrition
  Pie chart macro split
  Update / Add to log button

Settings:
  Grouped sections (Account, Preferences, Privacy, About)
  Each row: icon + label + value/toggle/arrow
```

---

## 6. Иконки

Стиль: **Outline** для неактивных, **Filled** для активных.
Набор: **Lucide Icons** (React Native: `lucide-react-native`, бесплатный, 1000+ иконок, consistent стиль).

Tab иконки:
| Tab | Иконка |
|-----|--------|
| Dashboard | `home` |
| Nutrition | `utensils` |
| Calendar | `calendar` |
| Map | `map-pin` |
| Profile | `user` |
| Clients (spec) | `users` |

---

## 7. Промты для Figma Make

> Копировать как есть в Figma Make. Один промт = один фрейм/экран.
> Формат: 390×844px (iPhone 14). Язык интерфейса: English.

### PROMPT 1: Design System — Color Tokens (Light)

```
Create a design system reference frame 1200x800px.
Title: "VitaCore — Light Theme Tokens".
Show color swatches in a grid:

Brand colors row:
- #ddefb5 label "brand-100"
- #9fd526 label "brand-300"
- #d3ff55 label "brand-500"
- #6ba000 label "brand-700"

Background row:
- #FFFFFF label "bg-primary"
- #F6F7F4 label "bg-secondary"
- #ECEEE8 label "bg-tertiary"

Text row:
- #1A1A1A label "text-primary"
- #6B6B6B label "text-secondary"
- #9E9E9E label "text-tertiary"

Semantic row:
- #E53935 label "error"
- #FB8C00 label "warning"
- #43A047 label "success"
- #1E88E5 label "info"

Each swatch: 80x80px rounded rectangle with color, hex below, name above.
Clean, minimal layout with Inter font.
```

### PROMPT 2: Design System — Color Tokens (Dark)

```
Create a design system reference frame 1200x800px.
Title: "VitaCore — Dark Theme Tokens".
Background of the frame: #0A0A0A.
Show color swatches in a grid, same layout as light but with dark values:

Brand: #ddefb5, #9fd526, #d3ff55, #6ba000
Background: #0A0A0A, #141414, #1E1E1E
Surface: #1A1A1A, #242424
Text: #F5F5F5, #A0A0A0, #666666
Border: #2A2A2A
Semantic: #EF5350, #FFA726, #66BB6A, #42A5F5

Each swatch: 80x80px rounded rectangle, hex below in #F5F5F5, name above.
Inter font. White labels on dark background.
```

### PROMPT 3: Component Library — Buttons

```
Create a component reference frame 1200x900px.
Title: "VitaCore — Buttons". Background #FFFFFF.
Show ALL button states in a grid:

Row 1 "Primary":
  Default (bg #9fd526, text #1A1A1A, 14px Medium Inter, height 44px, radius 12px, padding 14px 24px)
  Pressed (bg #6ba000)
  Disabled (bg #ECEEE8, text #9E9E9E)

Row 2 "Secondary":
  Default (transparent bg, border 1.5px #9fd526, text #9fd526, radius 12px)
  Pressed (bg #ddefb5)
  Disabled (border #E5E5E5, text #9E9E9E)

Row 3 "Ghost":
  Default (no bg, no border, text #9fd526)
  Pressed (bg #F6F7F4)

Row 4 "Destructive":
  Default (bg #E53935, text white)
  Pressed (bg #C62828)

Row 5 "Sizes": Large 52px / Medium 44px / Small 36px (show primary CTA in all 3)
Row 6 "With icon": button with 20px icon left of text, 8px gap
Row 7 "Full width": 358px wide primary button

Label each state. Clean grid. Inter font.
```

### PROMPT 4: Component Library — Inputs

```
Create a component reference frame 1200x800px.
Title: "VitaCore — Form Inputs". Background #FFFFFF.
Show input states:

Row 1 "Text Input":
  Empty with placeholder (bg #F6F7F4, border 1.5px #E5E5E5, radius 12px, placeholder "Enter your name" in #9E9E9E 14px, height 48px, padding 14px 16px)
  Filled (same but text "John Doe" in #1A1A1A 16px)
  Focused (bg #FFFFFF, border #9fd526)
  Error (border #E53935, red message "Name is required" 12px below)
  Disabled (bg #ECEEE8, text #9E9E9E)

Row 2 "With Label":
  Label "Full Name" 12px Medium #6B6B6B above, 6px gap, then input

Row 3 "Password": input with eye icon right to toggle visibility
Row 4 "Search": input with search icon left, clear X right
Row 5 "Select": input with chevron-down icon right, looks like trigger for dropdown

All Inter font. Clean spacing.
```

### PROMPT 5: Component Library — Cards

```
Create a component reference frame 1200x900px.
Title: "VitaCore — Cards". Background #F6F7F4.

Card 1 "Info Card": White bg, radius 16px, shadow 0 2px 8px rgba(0,0,0,0.06).
  Padding 16px. Title "Avocado Toast" 16px SemiBold, subtitle "8:30 AM" 12px #6B6B6B.
  Right side: "430 Kcal" in green #9fd526 16px Bold.

Card 2 "Progress Card": White bg, radius 16px, shadow.
  Title "Calories Today" 14px Medium #6B6B6B.
  Large number "1200" 32px Bold #1A1A1A, "KCal/Day" small below.
  Circular progress ring 80px right side (67% filled, #9fd526 track on #ECEEE8).
  Below ring: 3 small macros "Protein 45g/150g", "Carbs 120g/250g", "Fat 45g/150g".

Card 3 "Navigation Card": White bg, radius 16px.
  Left: 48px rounded square icon container bg #ddefb5 with icon.
  Center: title + subtitle.
  Right: chevron-right #9E9E9E.

Card 4 "Locked Card": Same as navigation card but:
  Opacity 0.5 on content. Lock icon 24px centered overlay.
  Subtle "Standard plan" text 11px below lock icon.

Card 5 "Specialist Card": White bg, radius 16px.
  Left: 56px circular avatar.
  Center: "Olena K." 16px SemiBold, "Trainer" chip below, stars ★★★★☆ 4.7.
  Right: "500m" distance 12px #6B6B6B.

All Inter font, realistic content, clean spacing.
```

### PROMPT 6: Dark Theme Cards

```
Create a component reference frame 1200x900px.
Title: "VitaCore — Cards (Dark)". Background #0A0A0A.

Same 5 cards as light but with dark theme:
  Card bg: #1A1A1A, border 1px #2A2A2A, NO shadow.
  Text primary: #F5F5F5. Secondary: #A0A0A0.
  Brand accent: #d3ff55 instead of #9fd526.
  Icon containers: bg rgba(211,255,85,0.1).
  Progress ring track: #2A2A2A, fill: #d3ff55.
  Lock overlay: same concept, lighter lock icon.

Same content, same layout. Inter font. Dark premium aesthetic like fitness apps.
```

### PROMPT 7: Bottom Tab Bar + Header

```
Create a component reference frame 800x400px.
Title: "VitaCore — Navigation".

Top row: Light theme
  Header: 390px wide, 56px tall, transparent bg.
    Left: "Dashboard" text 28px Bold #1A1A1A.
    Right: bell icon 24px #1A1A1A with red badge dot 8px.
  Tab bar: 390px wide, 60px tall, white bg, top border 1px #E5E5E5.
    5 tabs evenly spaced: Home (active, #9fd526 filled icon + green dot 4px below + label),
    Nutrition, Calendar, Map, Profile (all #9E9E9E outline icons + grey labels).
    Labels 11px Medium.

Bottom row: Dark theme
  Same layout. Header text #F5F5F5, bell icon #F5F5F5.
  Tab bar: bg #141414, border #2A2A2A.
  Active icon: #d3ff55 filled + neon dot. Inactive: #666666.

Inter font. Lucide-style icons (simple, outline, 24px).
```

### PROMPT 8: Bottom Sheet — Role Switcher

```
Create a mobile screen 390x844px. Background with content blurred and overlay rgba(0,0,0,0.4).

Bottom sheet from bottom, bg #FFFFFF, top border-radius 24px.
Handle bar: 36x4px #E5E5E5 centered, margin-top 8px.
Title "Switch Role" 18px SemiBold, padding 16px.

Role list:
  Row 1 (active): bg #ddefb5, 56px height.
    Left: circular avatar 40px with photo.
    Center: "User" 16px SemiBold, "Personal account" 12px #6B6B6B below.
    Right: green checkmark icon.

  Row 2: default bg white, 56px.
    Left: circular avatar 40px.
    Center: "Trainer" 16px, "Specialist account" 12px #6B6B6B.
    Right: arrow-right icon.

  Row 3: bg transparent, 56px.
    Left: 40px circle with + icon, dashed border #E5E5E5.
    Center: "Add specialist role" 16px #9fd526.
    Right: arrow-right #9fd526.

Padding 16px horizontal. Inter font. Clean and minimal.
```

### PROMPT 9: User Dashboard (Light)

```
Create a mobile app screen 390x844px. Background #F6F7F4.

Header: "Hello, Anna!" 22px SemiBold #1A1A1A left. Right: bell icon 24px with red badge.
Below: avatar 40px inline with greeting.

Section 1: "Calories Today" card, white bg, radius 16px, shadow.
  Left: large circular progress 80px, 67% filled #9fd526 on #ECEEE8 track.
    Center text: "1200" 28px Bold, "KCal" 12px below.
  Right column: 3 macro rows:
    "Protein" 45g/150g with mini linear progress green
    "Carbs" 120g/250g with mini linear progress green
    "Fat" 45g/150g with mini linear progress green

Section 2: Two small cards side by side.
  Left card: "Steps" icon, "7,000" 20px Bold, "Steps" 12px grey.
  Right card: "Water" icon, "1.5" 20px Bold, "Liters" 12px grey.

Section 3: "Today's Schedule" with week strip calendar (Mon-Sun),
  Wednesday highlighted with green circle.
  Below: appointment card "Training with Olena" 16:00, status "Confirmed" green chip.

Section 4: "Quick Actions" row of 3 circle buttons:
  "Log Meal" / "Find Specialist" / "Book Session"
  Each: 56px circle bg #ddefb5, icon #6ba000 inside, label 11px below.

Bottom tab bar: 5 tabs, Dashboard active (green).
All Inter font. Fresh, clean, light green accents.
```

### PROMPT 10: User Dashboard (Dark)

```
Create a mobile app screen 390x844px. Background #0A0A0A.

Same layout as light dashboard but dark theme:
  Header: "Hello, Anna!" #F5F5F5. Bell icon #F5F5F5.
  Cards: bg #1A1A1A, border 1px #2A2A2A, no shadow.
  Circular progress: track #2A2A2A, fill #d3ff55.
  Numbers: #F5F5F5. Secondary text: #A0A0A0.
  Week strip: today circle #d3ff55 with dark text.
  Quick actions: circles bg rgba(211,255,85,0.1), icon #d3ff55.
  Chips: bg rgba(211,255,85,0.15), text #d3ff55.
  Tab bar: bg #141414, active tab #d3ff55.

Premium dark fitness aesthetic. Neon green accents pop on dark background.
Inter font. Same content.
```

### PROMPT 11: Nutrition Screen (Light)

```
Create a mobile app screen 390x844px. Background #FFFFFF.

Header: "Nutrition" 28px Bold left. Bell icon right. Date "Wed, 12 Mar" 14px #6B6B6B.
Week strip: Mon-Sun, Wed active (green circle #9fd526).

KBJU Summary: 4 circular progress rings in a row, equal width.
  Calories 1200/2000 (60%), Protein 85/150g (57%), Carbs 180/250g (72%), Fat 45/65g (69%).
  Each: 56px ring, number below, label below number.
  Ring colors: calories #9fd526, protein #1E88E5, carbs #FB8C00, fat #E53935.

Meals list:
  "Breakfast" header 18px SemiBold, "(650 kcal)" #6B6B6B right.
    Food card 1: image 48px left, "Avocado Toast with Eggs" title,
      "8:30 AM" subtitle, "430 Kcal" green right.
    Food card 2: image 48px, "Protein Smoothie", "9:00 AM", "220 Kcal" right.

  "Lunch" header, "(520 kcal)".
    Food card: "Grilled Chicken Salad", "13:00", "520 Kcal".

  "Dinner" header, "(0 kcal)" with dashed border card "Add dinner +" placeholder.

FAB: green circle 56px bottom-right, + icon white, above tab bar.
Tab bar: Nutrition active (green).

Inter font. Clean food-tracking UI. Realistic content.
```

### PROMPT 12: Nutrition Screen (Dark)

```
Same layout as light Nutrition but on dark background #0A0A0A.
Cards: #1A1A1A bg, border #2A2A2A.
Progress rings: track #2A2A2A, fills keep their semantic colors but brighter:
  calories #d3ff55, protein #42A5F5, carbs #FFA726, fat #EF5350.
Text: #F5F5F5 primary, #A0A0A0 secondary.
FAB: #d3ff55 bg, #0A0A0A icon.
Dashed placeholder: border #2A2A2A dashed, text #666666.
Tab bar: #141414, Nutrition active #d3ff55.
Inter font. Dark premium look.
```

### PROMPT 13: Map / Search Screen (Light)

```
Create a mobile app screen 390x844px.

Full-screen Mapbox-style map occupying the whole screen behind the UI.
Light map style with green markers.

Top: search bar overlay, white bg, radius 12px, shadow.
  Search icon left, "Search trainers, gyms..." placeholder, filter icon right.

Below search: horizontal scrollable filter chips:
  "All" (active, bg #9fd526 text #1A1A1A),
  "Trainer" (bg #F6F7F4 text #6B6B6B),
  "Gym", "Masseur", "Clinic", "Nutritionist".

Map pins: green (#9fd526) circular pins with type icon inside.

Bottom: slide-up card when pin tapped:
  Specialist card: avatar 56px, "Olena Kovalenko" 16px Bold,
  "Trainer" chip + "★ 4.8 (23)" 12px,
  "FitGym Kyiv" venue 12px #6B6B6B,
  "350m away" 12px, "Book" primary button right.

Tab bar: Map active (green).
Inter font.
```

### PROMPT 14: Specialist Profile (viewed by user)

```
Create a mobile app screen 390x844px, scrollable. Background #FFFFFF.

Hero: photo carousel 390x300px (gym/training photos). Back arrow top-left, share top-right.
Below hero overlapping: white card radius 16px top.

Name: "Olena Kovalenko" 22px Bold.
Types: chips "Trainer" "Nutritionist" in green pill chips.
Rating: ★★★★★ 4.8 (47 reviews) 14px.
Languages: "UK EN" small chips.

Stats row: 3 equal columns, centered:
  "156" "Clients" / "1.2k" "Sessions" / "4.8" "Rating"

Section "About": bio text 14px, max 3 lines + "Read more".
Section "Services": list of service cards:
  "Personal Training" — 60 min — 800 UAH
  "Online Consultation" — 30 min — 400 UAH
Section "Certifications": horizontal scroll of cert cards.
Section "Reviews": 2 review cards (avatar, name, rating, text, date).

Sticky bottom: "Book Session" primary button full-width, padding 16px.
Inter font. Clean, trustworthy professional profile.
```

### PROMPT 15: Specialist Dashboard (Dark)

```
Create a mobile app screen 390x844px. Background #0A0A0A.
This is the SPECIALIST role view (after role switch).

Header: "Good morning, Olena" 22px SemiBold #F5F5F5.
  Right: bell icon with badge.
  Below: "3 sessions today" 14px #A0A0A0.

Section 1: "Pending Requests" — count badge "2".
  Card: bg #1A1A1A, border #2A2A2A.
    Avatar 40px, "Anna S." 16px, "Personal Training" 12px #A0A0A0.
    "Tomorrow 16:00" 12px. Two buttons: "Confirm" (primary small #d3ff55) / "Decline" (ghost).

Section 2: "Today's Schedule" — vertical timeline.
  Time on left (09:00, 10:30, 14:00...).
  Session cards on right:
    Active session (border #d3ff55, glow effect): "Training — Ivan M." with "In Progress" chip.
    Upcoming: "Massage — Katya D."
    Completed: muted card, checkmark.

Section 3: "Quick Stats" — 3 cards row.
  "12" "This week" / "48" "Active clients" / "4.8" "Rating".
  Cards: #1A1A1A bg, number #d3ff55.

Tab bar: 4 tabs (Dashboard / Clients / Calendar / Profile).
  Dashboard active #d3ff55.

Inter font. Dark premium CRM aesthetic for professionals.
```

### PROMPT 16: Onboarding — Welcome Screen

```
Create a mobile app screen 390x844px.

Full-screen gradient background: #0A0A0A to #141414.
Center: VitaCore logo (stylized "V" mark in #d3ff55, 80px).
Below: "VitaCore" 28px Bold #F5F5F5.
Tagline: "Your health, your specialists, your way" 16px #A0A0A0.

Bottom section:
  "Get Started" full-width button (bg #d3ff55, text #0A0A0A, 52px height, radius 12px).
  Below: "Already have an account? Log in" — "Log in" in #d3ff55 underlined.
  8px gap between buttons.

Subtle animated dots or gradient glow behind logo (describe in design).
Inter font. Premium, minimal onboarding.
```

### PROMPT 17: Register Screen

```
Create a mobile app screen 390x844px. Background #FFFFFF.

Top: Back arrow. "Create Account" 28px Bold center.
Subtitle: "Join VitaCore" 14px #6B6B6B.

Form:
  Input "Full Name" (with label above)
  Input "Email" (with label)
  Input "Password" (with label, eye icon toggle)
  Input "Confirm Password"
  All inputs: bg #F6F7F4, border #E5E5E5, radius 12px, height 48px.

"Create Account" primary button full-width (#9fd526 bg, #1A1A1A text).

Divider: "or continue with" line with text center.

OAuth row: 2 large buttons side by side:
  Apple: black bg, white Apple logo + "Apple", radius 12px, 48px.
  Google: white bg, border #E5E5E5, Google logo + "Google", radius 12px, 48px.

Bottom: "Already have an account? Log in" centered. "Log in" in #9fd526.
Inter font. Standard auth screen, clean.
```

### PROMPT 18: Food Detail Screen (Light)

```
Create a mobile app screen 390x844px. Background #FFFFFF.

Header: back arrow left, "Avocado Toast with Eggs" 18px SemiBold center.

Hero: food photo 390x240px (avocado toast with eggs, bright photography).
  Floating ingredient tags on photo: "Avocado" "Egg" "Bread" — small pill chips
  bg rgba(255,255,255,0.85), text 12px.

Card below: white bg, radius 16px, shadow.
  "Serving Size" 16px SemiBold, adjuster: minus circle | "2" 20px Bold | plus circle.
  Divider line.
  Nutrient rows:
    Icon (colored circle 8px) + "Protein" + "2 Boiled Eggs" #6B6B6B + "32g" right bold
    Icon + "Carb" + "Bread slice" + "45g"
    Icon + "Vitamin" + "1 Avocado" + "22g"
    Icon + "Nutrition" + "3 Tomato" + "50g"
  Divider.
  "Total Nutrition" 16px SemiBold + "420 kcal" right.

Below card: 4 circular percentages in a row:
  10% Carb, 50% Protein, 40% Fat, 60% Vitamin.
  Below each: micro icons (bones, heart, teeth, brain).

Bottom button: "Update Details" full-width primary (#9fd526).
Inter font. Fresh, informative food detail screen.
```

---

## 8. Figma Structure

```
Figma файл: "VitaCore Design"
Pages:
  1. 🎨 Design System
     ├── Colors (Light + Dark)
     ├── Typography
     ├── Icons
     └── Grid & Spacing

  2. 🧩 Components
     ├── Buttons (all states, both themes)
     ├── Inputs (all states, both themes)
     ├── Cards (all variants, both themes)
     ├── Navigation (tab bar, header, both themes)
     ├── Bottom Sheets (role switcher, select, confirmation)
     ├── Chips & Tags
     ├── Progress (circular, linear)
     ├── Avatars
     ├── Badges & Locks
     └── Toasts

  3. 📱 Screens — User (Light)
     ├── Onboarding (Welcome, Features, Register, Login)
     ├── Role & Goals selection
     ├── Dashboard
     ├── Nutrition (list + food detail)
     ├── Calendar
     ├── Map / Search
     ├── Profile
     ├── Notifications
     ├── Specialist Profile (view)
     ├── Booking flow
     └── Settings

  4. 📱 Screens — User (Dark)
     (same screens in dark theme)

  5. 📱 Screens — Specialist (Dark)
     ├── Dashboard
     ├── Clients (list + detail)
     ├── Calendar / Schedule
     ├── Session (live)
     ├── Profile (edit)
     └── Notifications

  6. 📱 Screens — Specialist (Light)
     (same screens in light theme)

  7. 🔄 Flows
     ├── Onboarding → Register → Choose Role → Profile
     ├── Search → Specialist → Book → Confirm
     ├── Log Meal → Search Food → Add
     ├── Notification → Confirm Appointment
     └── Role Switch
```

---

## 9. Рекомендации для реализации (React Native)

| Аспект | Решение |
|--------|---------|
| Theme switching | `zustand` store + `useColorScheme()` (RN API) |
| Design tokens | `theme.ts` с объектами `lightTheme` / `darkTheme` |
| Components | `packages/ui-kit/` — все компоненты с `useTheme()` hook |
| Icons | `lucide-react-native` |
| Typography | `Inter` через `expo-font` |
| Spacing | Constants: `spacing.xs=4, sm=8, md=12, lg=16, xl=24, xxl=32` |
| Border radius | Constants: `radius.sm=8, md=12, lg=16, xl=20, pill=999` |
| Animations | `react-native-reanimated` for bottom sheets, transitions |
| Tab bar | Custom tab bar component (React Navigation) |

---

*Этот файл — living document. Обновляется по мере развития дизайна.*
