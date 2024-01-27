import type { MetaFunction } from '@remix-run/node';
import { Outlet, useNavigation } from '@remix-run/react';
import { clsx } from '@resolid-remix/ui';
import { Suspense } from 'react';
import { LazySpinner } from '~/components/LazySpinner';
import { AsideLayout } from '~/components/layout/AsideLayout';
import { AsideLayoutMain } from '~/components/layout/AsideLayoutMain';
import type { Menu } from '~/components/layout/AsideLayoutMenu';
import { AsideLayoutSide } from '~/components/layout/AsideLayoutSide';
import { BaseLayout } from '~/components/layout/BaseLayout';

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [
    {
      title: '组件库',
    },
  ];
};

export default function Layout() {
  const navigation = useNavigation();
  const navigating = navigation.location && !navigation.formData;

  return (
    <BaseLayout>
      <AsideLayout>
        <AsideLayoutSide menus={menus} />
        <AsideLayoutMain className={clsx(navigating && 'opacity-25 transition-opacity delay-300')}>
          <Suspense fallback={<LazySpinner />}>
            <Outlet />
          </Suspense>
        </AsideLayoutMain>
      </AsideLayout>
    </BaseLayout>
  );
}

const menus: Menu[] = [
  {
    label: '概述',
    children: [
      {
        label: '介绍',
        path: 'introduction',
      },
      {
        label: '入门指南',
        path: 'getting-started',
      },
      {
        label: '主题',
        path: 'theming',
      },
      {
        label: '黑暗模式',
        path: 'dark-mode',
      },
      {
        label: '动画效果',
        path: 'animation',
      },
    ],
  },
  {
    label: '通用组件',
    children: [
      {
        label: '按钮',
        path: 'components/button',
      },
      {
        label: '图标',
        path: 'components/icon',
      },
      {
        label: '图片',
        path: 'components/image',
      },
      {
        label: '排版',
        path: 'components/typography',
      },
    ],
  },
  {
    label: '布局',
    children: [
      {
        label: '布局',
        path: 'components/layout',
      },
      {
        label: '弹性布局',
        path: 'components/flex',
      },
      {
        label: '网格',
        path: 'components/grid',
      },
      {
        label: '表格',
        path: 'components/table',
      },
      {
        label: '分割线',
        path: 'components/divider',
      },
    ],
  },
  {
    label: '数据展示',
    children: [
      {
        label: '头像',
        path: 'components/avatar',
      },
      {
        label: '徽标',
        path: 'components/badge',
      },
    ],
  },
  {
    label: '数据输入',
    children: [
      {
        label: '输入框',
        path: 'components/input',
      },
      {
        label: '数字输入框',
        path: 'components/number-input',
      },
      {
        label: '选择器',
        path: 'components/select',
      },
      {
        label: '滑动输入条',
        path: 'components/slider',
      },
      {
        label: '复选框',
        path: 'components/checkbox',
      },
      {
        label: '单选框',
        path: 'components/radio',
      },
      {
        label: '开关',
        path: 'components/switch',
      },
    ],
  },
  {
    label: '交互反馈',
    children: [
      {
        label: '警告提示',
        path: 'components/alert',
      },
      {
        label: '通知提醒',
        path: 'components/toast',
      },
      {
        label: '工具提示',
        path: 'components/tooltip',
      },
      {
        label: '弹出框',
        path: 'components/popover',
      },
      {
        label: '模态框',
        path: 'components/modal',
      },
      {
        label: '抽屉',
        path: 'components/drawer',
      },
      {
        label: '进度条',
        path: 'components/progress-bar',
      },
      {
        label: '加载器',
        path: 'components/spinner',
      },
      {
        label: '覆盖层',
        path: 'components/overlay',
      },
      {
        label: '加载覆盖层',
        path: 'components/spinner-overlay',
      },
    ],
  },
  {
    label: '页面导航',
    children: [
      {
        label: '面包屑',
        path: 'components/breadcrumb',
      },
      {
        label: '分页',
        path: 'components/pagination',
      },
      {
        label: '下拉菜单',
        path: 'components/dropdown-menu',
      },
      {
        label: '右键菜单',
        path: 'components/context-menu',
      },
    ],
  },
];
