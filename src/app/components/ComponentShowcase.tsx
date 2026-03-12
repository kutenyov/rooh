import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Chip } from './Chip';
import { CircularProgress } from './CircularProgress';
import { LinearProgress } from './LinearProgress';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { ThemeToggle } from './ThemeToggle';
import {
  Heart,
  Activity,
  TrendingUp,
  Search,
  Eye,
  ChevronDown,
  Bell,
  Flame,
  Droplet,
  Footprints,
} from 'lucide-react';

export function ComponentShowcase() {
  const [selectedChip, setSelectedChip] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-text-primary mb-2">Rooh Design System</h1>
          <p className="text-text-secondary">Component Library Showcase</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-[var(--radius-card)] bg-brand-100 border border-border" />
            <p className="text-text-secondary text-sm">brand-100</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-[var(--radius-card)] bg-brand-300 border border-border" />
            <p className="text-text-secondary text-sm">brand-300</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-[var(--radius-card)] bg-brand-500 border border-border" />
            <p className="text-text-secondary text-sm">brand-500</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-[var(--radius-card)] bg-brand-700 border border-border" />
            <p className="text-text-secondary text-sm">brand-700</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Buttons</h2>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-text-primary">Primary</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="large">
                Large Button
              </Button>
              <Button variant="primary" size="medium">
                Medium Button
              </Button>
              <Button variant="primary" size="small">
                Small Button
              </Button>
              <Button variant="primary" size="medium" disabled>
                Disabled
              </Button>
              <Button variant="primary" size="medium" icon={<Heart />}>
                With Icon
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary">Secondary</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="medium">
                Secondary Button
              </Button>
              <Button variant="secondary" size="medium" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary">Ghost & Destructive</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" size="medium">
                Ghost Button
              </Button>
              <Button variant="destructive" size="medium">
                Destructive
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary">Full Width</h3>
            <Button variant="primary" size="large" fullWidth>
              Full Width Button
            </Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Form Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Input
            placeholder="Enter your name"
            label="Full Name"
          />
          <Input
            placeholder="name@example.com"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter password"
            label="Password"
            type="password"
            icon={<Eye />}
            iconPosition="right"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Search trainers, gyms..."
            icon={<Search />}
            iconPosition="left"
          />
          <Input
            placeholder="Select option"
            icon={<ChevronDown />}
            iconPosition="right"
            readOnly
          />
          <Input
            placeholder="This field has an error"
            label="With Error"
            error="This field is required"
          />
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            icon={<Flame />}
            title="Calories Today"
            subtitle="1200 / 2000 KCal"
            value="60%"
          />
          
          <Card
            icon={<Activity />}
            title="Avocado Toast"
            subtitle="8:30 AM"
            value="430 KCal"
            variant="navigation"
          />
          
          <Card
            icon={<Heart />}
            title="Heart Rate"
            subtitle="Average today"
            progress={
              <CircularProgress value={75} size="medium" />
            }
          />

          <Card
            icon={<TrendingUp />}
            title="Weight Progress"
            subtitle="Last 30 days"
          >
            <div className="mt-2">
              <LinearProgress value={65} showLabel label="Target" />
            </div>
          </Card>

          <Card
            icon={<Droplet />}
            title="Water Intake"
            subtitle="1.5 / 2.5 Liters"
          >
            <div className="mt-2">
              <LinearProgress value={60} color="info" />
            </div>
          </Card>

          <Card
            variant="locked"
            icon={<Footprints />}
            title="Advanced Analytics"
            subtitle="Track detailed metrics"
            lockText="Standard plan"
          />
        </div>
      </section>

      {/* Progress Indicators */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Progress Indicators</h2>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-text-primary">Circular Progress</h3>
            <div className="flex flex-wrap gap-6">
              <CircularProgress value={67} size="large" label="Calories" />
              <CircularProgress value={57} size="medium" color="info" />
              <CircularProgress value={72} size="small" color="warning" />
              <CircularProgress value={45} size="medium" color="error" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary">Linear Progress</h3>
            <div className="space-y-4 max-w-md">
              <LinearProgress value={85} showLabel label="Protein" color="brand" />
              <LinearProgress value={60} showLabel label="Carbs" color="warning" />
              <LinearProgress value={45} showLabel label="Fat" color="error" />
              <LinearProgress value={90} showLabel label="Water" color="info" />
            </div>
          </div>
        </div>
      </section>

      {/* Chips */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Chips & Tags</h2>
        <div className="flex flex-wrap gap-3">
          {['All', 'Trainer', 'Gym', 'Masseur', 'Clinic', 'Nutritionist'].map((label, index) => (
            <Chip
              key={label}
              selected={selectedChip === index}
              onClick={() => setSelectedChip(index)}
            >
              {label}
            </Chip>
          ))}
        </div>
      </section>

      {/* Avatars */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Avatars</h2>
        <div className="flex flex-wrap items-end gap-6">
          <Avatar initials="AK" size="tiny" />
          <Avatar initials="OK" size="small" />
          <Avatar initials="JS" size="medium" online />
          <Avatar initials="MD" size="large" online />
          <Avatar initials="VP" size="xl" />
        </div>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Badges</h2>
        <div className="flex flex-wrap gap-8">
          <Badge count={3}>
            <Bell className="w-6 h-6 text-icon-primary" />
          </Badge>
          <Badge count={99}>
            <Bell className="w-6 h-6 text-icon-primary" />
          </Badge>
          <Badge count={150}>
            <Bell className="w-6 h-6 text-icon-primary" />
          </Badge>
          <Badge variant="dot">
            <Bell className="w-6 h-6 text-icon-primary" />
          </Badge>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-text-primary mb-6">Typography</h2>
        <div className="space-y-4 max-w-2xl">
          <div>
            <h1>Heading 1 - Dashboard</h1>
            <p className="text-text-tertiary text-sm mt-1">28px Bold, 34px line-height</p>
          </div>
          <div>
            <h2>Heading 2 - Daily Meals</h2>
            <p className="text-text-tertiary text-sm mt-1">22px SemiBold, 28px line-height</p>
          </div>
          <div>
            <h3>Heading 3 - Breakfast</h3>
            <p className="text-text-tertiary text-sm mt-1">18px SemiBold, 24px line-height</p>
          </div>
          <div>
            <h4>Heading 4 - Section Title</h4>
            <p className="text-text-tertiary text-sm mt-1">16px Medium, 22px line-height</p>
          </div>
          <div>
            <p className="text-text-primary">
              Body text - This is a paragraph with regular weight. Inter font family provides excellent readability across all screen sizes.
            </p>
            <p className="text-text-tertiary text-sm mt-1">16px Regular, 22px line-height</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm">
              Secondary text - Used for hints, timestamps, and secondary information.
            </p>
            <p className="text-text-tertiary text-sm mt-1">14px Regular, 20px line-height</p>
          </div>
        </div>
      </section>
    </div>
  );
}