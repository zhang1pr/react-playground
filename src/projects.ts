import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const projectModules = import.meta.glob<{ default: ComponentType }>(
  './*/App.tsx',
)

export type Project = {
  id: string
  name: string
  Component: LazyExoticComponent<ComponentType>
}

export const projects: Project[] = Object.entries(projectModules).map(
  ([path, load]) => {
    const id = path.match(/^\.\/(.+)\/App\.tsx$/)?.[1] ?? path

    return {
      id,
      name: id,
      Component: lazy(load),
    }
  },
)

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}