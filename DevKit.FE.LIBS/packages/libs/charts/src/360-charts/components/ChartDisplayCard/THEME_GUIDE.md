# ChartDisplayCard Theme Guide

Complete reference for all available theme variants matching the Figma design system.

## 📦 Available Themes (24 Total)

### 🎯 Product Themes

Use these for product-specific metrics and data.

| Theme      | Color     | Use Case                               | Example                   |
| ---------- | --------- | -------------------------------------- | ------------------------- |
| `rhoon`    | Sky Blue  | Rhoon product metrics, mortgage data   | Rhoon transaction volumes |
| `wtheeq`   | Orange    | Wtheeq product metrics, insurance data | Wtheeq policy analytics   |
| `combined` | Dark Blue | Combined product metrics, totals       | Combined revenue charts   |

```tsx
<ChartDisplayCard theme="rhoon" title="Rhoon Mortgages" {...props} />
<ChartDisplayCard theme="wtheeq" title="Wtheeq Policies" {...props} />
<ChartDisplayCard theme="combined" title="Total Revenue" {...props} />
```

---

### ✅ Status Themes

Use these for status indicators and metrics with positive/negative/warning states.

| Theme                 | Color | Use Case                          | Example                                 |
| --------------------- | ----- | --------------------------------- | --------------------------------------- |
| `success` / `emerald` | Green | Positive metrics, growth, success | Revenue growth, successful transactions |
| `warning`             | Amber | Warnings, pending items           | Pending approvals, alerts               |
| `danger`              | Red   | Errors, critical issues, failures | Failed transactions, errors             |

```tsx
<ChartDisplayCard theme="success" title="Growth Rate" {...props} />
<ChartDisplayCard theme="warning" title="Pending Reviews" {...props} />
<ChartDisplayCard theme="danger" title="Failed Transactions" {...props} />
```

---

### 🏠 Category/Mortgage Themes

Use these for categorical data, particularly mortgage types and pie chart segments.

| Theme      | Color       | Use Case                     | Example             |
| ---------- | ----------- | ---------------------------- | ------------------- |
| `teal`     | Mint Green  | New mortgages, category 1    | New Mortgage types  |
| `lavender` | Purple      | Category 2, premium items    | Premium services    |
| `pink`     | Pink        | Category 3, special items    | VIP customers       |
| `gold`     | Peach/Gold  | Premium services, category 4 | Gold tier services  |
| `sky-blue` | Light Blue  | Category 5                   | Standard services   |
| `coral`    | Light Coral | Category 6, final items      | Additional services |

```tsx
<ChartDisplayCard theme="teal" title="New Mortgages" {...props} />
<ChartDisplayCard theme="lavender" title="Premium Plans" {...props} />
<ChartDisplayCard theme="pink" title="VIP Customers" {...props} />
<ChartDisplayCard theme="gold" title="Gold Services" {...props} />
<ChartDisplayCard theme="sky-blue" title="Standard Services" {...props} />
<ChartDisplayCard theme="coral" title="Additional Items" {...props} />
```

---

### 🎨 General UI Themes

Use these for general interface elements and neutral data.

| Theme                     | Color         | Use Case                          | Example                    |
| ------------------------- | ------------- | --------------------------------- | -------------------------- |
| `blue`                    | Standard Blue | General analytics, default charts | General metrics            |
| `deep-blue`               | Indigo Blue   | Important data, emphasis          | Key performance indicators |
| `light-purple` / `purple` | Purple        | Creative metrics, engagement      | User engagement            |
| `indigo`                  | Indigo        | Deep analytics                    | Detailed analysis          |
| `slate`                   | Gray          | Neutral data, secondary info      | Supporting metrics         |
| `cyan`                    | Cyan          | Data streams, real-time           | Live data feeds            |

```tsx
<ChartDisplayCard theme="blue" title="Analytics" {...props} />
<ChartDisplayCard theme="deep-blue" title="KPI Dashboard" {...props} />
<ChartDisplayCard theme="purple" title="User Engagement" {...props} />
<ChartDisplayCard theme="indigo" title="Deep Insights" {...props} />
<ChartDisplayCard theme="slate" title="Supporting Data" {...props} />
<ChartDisplayCard theme="cyan" title="Live Feed" {...props} />
```

---

## 🎯 Theme Selection Guide

### By Data Type

**Financial/Revenue Data:**

- Positive growth → `success` / `emerald`
- Revenue tracking → `gold`
- Combined totals → `combined`

**Product-Specific:**

- Rhoon (Mortgages) → `rhoon`
- Wtheeq (Insurance) → `wtheeq`

**Status/Health:**

- Healthy/Good → `success` / `emerald`
- Warning/Attention → `warning`
- Error/Critical → `danger`

**Categories (Pie Charts):**

- Use: `teal`, `lavender`, `pink`, `gold`, `sky-blue`, `coral`
- Match the theme to your pie chart segment colors for visual consistency

**General Analytics:**

- Default → `blue`
- Important → `deep-blue`
- Neutral → `slate`

---

## 💡 Best Practices

### 1. **Maintain Visual Hierarchy**

```tsx
// Primary metric - bold color
<ChartDisplayCard theme="emerald" title="Total Revenue" />

// Secondary metrics - subtle colors
<ChartDisplayCard theme="slate" title="Supporting Data" />
```

### 2. **Match Chart Content Colors**

```tsx
// If your PieChart uses teal, use teal theme
<ChartDisplayCard theme="teal" title="Mortgage Distribution">
	<PieChart data={mortgageData} color="teal" />
</ChartDisplayCard>
```

### 3. **Product Consistency**

```tsx
// Always use rhoon theme for Rhoon product
<ChartDisplayCard theme="rhoon" title="Rhoon Metrics" />

// Always use wtheeq theme for Wtheeq product
<ChartDisplayCard theme="wtheeq" title="Wtheeq Metrics" />
```

### 4. **Dashboard Layout**

```tsx
// Top row - Product themes
<ChartDisplayCard theme="rhoon" {...} />
<ChartDisplayCard theme="wtheeq" {...} />

// Middle row - Status themes
<ChartDisplayCard theme="success" {...} />
<ChartDisplayCard theme="warning" {...} />

// Bottom row - Category themes
<ChartDisplayCard theme="teal" {...} />
<ChartDisplayCard theme="lavender" {...} />
```

---

## 🎨 Color Palette Reference

### Visual Preview

```
🔵 Product Themes:
  rhoon     → Sky Blue    (#0ea5e9)
  wtheeq    → Orange      (#f97316)
  combined  → Dark Blue   (#1e40af)

✅ Status Themes:
  success   → Emerald     (#10b981)
  warning   → Amber       (#f59e0b)
  danger    → Red         (#ef4444)

🏠 Category Themes:
  teal      → Mint        (#86d9c0 → #6fcfa0)
  lavender  → Purple      (#b19bfb → #a588f0)
  pink      → Pink        (#f2a1c7 → #e895b8)
  gold      → Peach       (#f7c77a → #f5be6b)
  sky-blue  → Light Blue  (#7bc3f0 → #6bb5ed)
  coral     → Coral       (#f4a5a5 → #e89999)

🎨 General UI:
  blue      → Blue        (#3b82f6)
  deep-blue → Indigo      (#4f46e5)
  purple    → Purple      (#a855f7)
  indigo    → Indigo      (#6366f1)
  slate     → Gray        (#64748b)
  cyan      → Cyan        (#06b6d4)
```

---

## 📝 Component Props

```tsx
interface ChartDisplayCardProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
	icon?: FC<SVGProps<SVGSVGElement>>;
	badgeText: string;
	theme: ChartDisplayCardTheme; // 24 options!
	hasView?: boolean;
	onViewAll?: () => void;
}
```

---

## 🚀 Quick Examples

### Dashboard with Multiple Themes

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
	{/* Product Metrics */}
	<ChartDisplayCard
		theme="rhoon"
		title="Rhoon Transactions"
		subtitle="Monthly Volume"
		icon={ChartIcon}
		badgeText="Last 6 Months"
	>
		<BarChart data={rhoonData} />
	</ChartDisplayCard>

	<ChartDisplayCard
		theme="wtheeq"
		title="Wtheeq Policies"
		subtitle="Active Policies"
		icon={ShieldIcon}
		badgeText="Current"
	>
		<PieChart data={policyData} />
	</ChartDisplayCard>

	{/* Category Analysis */}
	<ChartDisplayCard
		theme="teal"
		title="New Mortgages"
		subtitle="By Type"
		icon={HomeIcon}
		badgeText="Top 5"
		hasView
		onViewAll={() => navigate('/mortgages')}
	>
		<DonutChart data={mortgageData} />
	</ChartDisplayCard>

	{/* Status Monitoring */}
	<ChartDisplayCard
		theme="success"
		title="Success Rate"
		subtitle="Transaction Completion"
		icon={CheckIcon}
		badgeText="98.5%"
	>
		<MeterChart value={98.5} />
	</ChartDisplayCard>
</div>
```

---

## 🔄 Migration from Old Themes

If you had only 4 themes before:

```tsx
// Old
'emerald' | 'blue' | 'deep-blue' | 'light-purple';

// New - All still work! Plus 20 more options
'emerald' |
	'blue' |
	'deep-blue' |
	'light-purple' |
	'rhoon' |
	'wtheeq' |
	'combined' |
	'success' |
	'warning' |
	'danger' |
	'teal' |
	'lavender' |
	'pink' |
	'gold' |
	'sky-blue' |
	'coral' |
	'purple' |
	'indigo' |
	'slate' |
	'cyan';
```

**No breaking changes** - all existing themes continue to work!

---

## 📚 Related Files

- **Color System**: `apps/customer-portal/src/app/dashboard-360/utils/chartColors.ts`
- **Component**: `apps/customer-portal/src/app/dashboard-360/components/ChartDisplayCard/index.tsx`
- **Usage Example**: `apps/customer-portal/src/app/views/dashboard360/index.tsx`

---

Last Updated: 2025-01-15
