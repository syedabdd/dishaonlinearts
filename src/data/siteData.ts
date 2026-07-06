// ===== Type Definitions =====
export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

// ===== Navigation =====
export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: 'https://dishaonlineclasses.com/course.php' },
  { label: 'Notifications', href: 'https://dishaonlineclasses.com/notification.php' },
  { label: 'Study Material', href: 'https://dishaonlineclasses.com/study-materials.php' },
  { label: 'Quiz', href: 'https://dishaonlineclasses.com/quiz_home.php' },
  { label: 'Free Course', href: '/free-courses' },
  { label: 'Ask Doubt', href: '/ask-doubt' },
];

// ===== Trust Statistics =====
export const stats: Stat[] = [
  { icon: 'Users', value: 50000, suffix: '+', label: 'Students Enrolled' },
  { icon: 'Trophy', value: 95, suffix: '%', label: 'Board Pass Rate' },
  { icon: 'Youtube', value: 968, suffix: 'K+', label: 'YouTube Subscribers' },
  { icon: 'GraduationCap', value: 8, suffix: '+ Yrs', label: 'Teaching Excellence' },
];
