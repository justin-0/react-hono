/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TransactionsLazyImport = createFileRoute('/transactions')()
const CreateLazyImport = createFileRoute('/create')()
const AnalyticsLazyImport = createFileRoute('/analytics')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TransactionsLazyRoute = TransactionsLazyImport.update({
  path: '/transactions',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/transactions.lazy').then((d) => d.Route))

const CreateLazyRoute = CreateLazyImport.update({
  path: '/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/create.lazy').then((d) => d.Route))

const AnalyticsLazyRoute = AnalyticsLazyImport.update({
  path: '/analytics',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/analytics.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/analytics': {
      id: '/analytics'
      path: '/analytics'
      fullPath: '/analytics'
      preLoaderRoute: typeof AnalyticsLazyImport
      parentRoute: typeof rootRoute
    }
    '/create': {
      id: '/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof CreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/transactions': {
      id: '/transactions'
      path: '/transactions'
      fullPath: '/transactions'
      preLoaderRoute: typeof TransactionsLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AnalyticsLazyRoute,
  CreateLazyRoute,
  TransactionsLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/analytics",
        "/create",
        "/transactions"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/analytics": {
      "filePath": "analytics.lazy.tsx"
    },
    "/create": {
      "filePath": "create.lazy.tsx"
    },
    "/transactions": {
      "filePath": "transactions.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
