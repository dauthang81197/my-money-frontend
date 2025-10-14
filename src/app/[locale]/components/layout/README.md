# Layout Components

Các component layout có thể tái sử dụng cho toàn bộ ứng dụng dashboard.

## Components

### 1. DashboardLayout
Component layout chính bao gồm Sidebar và Header.

```tsx
import { DashboardLayout } from '../components/layout';

export default function MyPage() {
  return (
    <DashboardLayout
      activeNav="Dashboard"
      title="Welcome back, John"
      subtitle="Manage your application."
      userName="John"
      onNavChange={(nav) => console.log(nav)}
      onExport={() => console.log('Export')}
      onCreateReport={() => console.log('Create Report')}
    >
      {/* Your page content here */}
    </DashboardLayout>
  );
}
```

#### Props
- `children`: ReactNode - Nội dung trang
- `activeNav`: string - Navigation item đang active (default: 'Reports')
- `title`: string - Tiêu đề header
- `subtitle`: string - Mô tả header
- `userName`: string - Tên người dùng
- `showExportButton`: boolean - Hiển thị nút Export (default: true)
- `showCreateReportButton`: boolean - Hiển thị nút Create Report (default: true)
- `onNavChange`: (nav: string) => void - Callback khi navigation thay đổi
- `onExport`: () => void - Callback khi click Export
- `onCreateReport`: () => void - Callback khi click Create Report

### 2. Sidebar
Component sidebar với navigation menu.

```tsx
import { Sidebar } from '../components/layout';

<Sidebar 
  activeNav="Dashboard" 
  onNavChange={(nav) => console.log(nav)}
/>
```

#### Props
- `activeNav`: string - Navigation item đang active
- `onNavChange`: (nav: string) => void - Callback khi navigation thay đổi

### 3. Header
Component header với title và action buttons.

```tsx
import { Header } from '../components/layout';

<Header
  title="Welcome back, John"
  subtitle="Manage your application."
  userName="John"
  showExportButton={true}
  showCreateReportButton={true}
  onExport={() => console.log('Export')}
  onCreateReport={() => console.log('Create Report')}
/>
```

#### Props
- `title`: string - Tiêu đề header
- `subtitle`: string - Mô tả header
- `userName`: string - Tên người dùng
- `showExportButton`: boolean - Hiển thị nút Export
- `showCreateReportButton`: boolean - Hiển thị nút Create Report
- `onExport`: () => void - Callback khi click Export
- `onCreateReport`: () => void - Callback khi click Create Report

## Navigation Items

Sidebar bao gồm các navigation items sau:
- Dashboard
- All pages
- Reports
- Products
- Task
- Features
- Users
- Pricing
- Integrations
- Settings
- Template pages

## Ví dụ sử dụng

### Trang Dashboard
```tsx
// app/dashboard/page.tsx
<DashboardLayout activeNav="Reports">
  {/* Dashboard content */}
</DashboardLayout>
```

### Trang Users
```tsx
// app/users/page.tsx
<DashboardLayout 
  activeNav="Users"
  title="User Management"
  subtitle="Manage your application users."
>
  {/* Users content */}
</DashboardLayout>
```

### Trang Products
```tsx
// app/products/page.tsx
<DashboardLayout 
  activeNav="Products"
  title="Product Management"
  subtitle="Manage your product catalog."
>
  {/* Products content */}
</DashboardLayout>
```

## Customization

### Thay đổi màu sắc
Sử dụng CSS variables đã định nghĩa trong `global.css`:
- `--color-primary`: Màu chính
- `--color-secondary-*`: Màu phụ
- `--color-neutral-*`: Màu trung tính

### Thêm navigation items
Chỉnh sửa array `navigationItems` trong `Sidebar.tsx`:

```tsx
const navigationItems = [
  { name: 'Dashboard', icon: BarChart3 },
  { name: 'My New Page', icon: NewIcon },
  // ... other items
];
```

### Tùy chỉnh header
Có thể ẩn/hiện các buttons và tùy chỉnh callbacks:

```tsx
<DashboardLayout
  showExportButton={false}
  showCreateReportButton={false}
  onNavChange={(nav) => {
    // Custom navigation logic
    router.push(`/${nav.toLowerCase()}`);
  }}
>
``` 