// 查找树的一些工具函数

/**
 * 通用查找函数，根据指定的字段和值查找树形结构中的节点。
 * @param node 当前节点。
 * @param key 要匹配的字段。
 * @param value 要匹配的字段值。
 * @return 找到的节点或null。
 */
export function findNodeByField<T, K extends keyof T>(node: T, key: K, value: T[K]): T | null {
  // 检查当前节点的指定字段是否匹配
  if (node[key] === value) {
    return node
  }

  // 如果当前节点有子节点，递归搜索每个子节点
  const children = (node as any).children as T[] // 强制类型转换，假定有 children 属性
  if (children && children.length) {
    for (let child of children) {
      const result = findNodeByField(child, key, value)
      if (result) {
        return result
      }
    }
  }

  // 如果没有找到匹配的节点，返回null
  return null
}

/**
 * 查找树形结构中的节点，并返回该节点的父节点。
 * @param node 当前节点。
 * @param key 要匹配的字段。
 * @param value 要匹配的字段值。
 * @param parent 当前节点的父节点，默认为null。
 * @return 找到的节点的父节点或null。
 */
// export function findParentNode<
//   T extends {
//     children?: T[]
//   },
//   K extends keyof T,
// >(node: T, key: K, value: T[K], parent: T | null = null): T | null {
//   // 检查当前节点的指定字段是否匹配
//   if (node[key] === value) {
//     return parent
//   }
//
//   // 如果当前节点有子节点，递归搜索每个子节点
//   if (node.children) {
//     for (let child of node.children) {
//       const result = findParentNode(child, key, value, node) // 将当前节点作为父节点传递
//       if (result) return result
//     }
//   }
//
//   // 如果没有找到匹配的节点的父节点，返回null
//   return null
// }

/**
 * 查找树形结构中的节点，并返回所有祖先节点或其特定字段值的数组。
 * @param node 当前节点。
 * @param key 要匹配的字段。
 * @param value 要匹配的字段值。
 * @param parentKey 需要返回的父级节点的字段。
 * @param ancestors 祖先节点数组，用于递归时传递。
 * @return 祖先节点数组或其字段值的数组。
 */
export function findAllAncestors<
  T extends {
    children?: T[]
  },
  K extends keyof T,
>(node: T, key: K, value: T[K], parentKey?: K, ancestors: any[] = []): any[] {
  // 检查当前节点的指定字段是否匹配
  if (node[key] === value) {
    // 返回祖先节点数组或其指定字段的值
    return parentKey ? ancestors.map((ancestor) => ancestor[parentKey]) : ancestors
  }

  // 如果当前节点有子节点，递归搜索每个子节点
  if (node.children) {
    for (let child of node.children) {
      const result = findAllAncestors(child, key, value, parentKey, ancestors.concat([node])) // 将当前节点加入祖先列表
      if (result.length) return result
    }
  }

  // 如果没有找到目标节点，返回空数组
  return []
}

interface TreeNode {
  children?: TreeNode[]
  disabled?: boolean
  label?: string
  value?: string | number
}

/**
 * 查找树形结构中的节点，并返回该节点的父节点。
 * @param nodes 当前节点。
 * @param key 要匹配的字段。
 * @param value 要匹配的字段值。
 * @return 找到的节点的父节点或null。
 */
export function findParentNode(nodes: TreeNode[], key: keyof TreeNode, value: any): TreeNode | null {
  function search(nodes: TreeNode[], key: keyof TreeNode, value: any, parent: TreeNode | null): TreeNode | null {
    for (const node of nodes) {
      if (node[key] === value) {
        return parent
      }

      if (node.children) {
        const result = search(node.children, key, value, node)
        if (result) {
          return result
        }
      }
    }
    return null
  }

  return search(nodes, key, value, null)
}
