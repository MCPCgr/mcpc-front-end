export function structCreator(arr) {
  const tree = [];
  const map = new Map();

  // First pass to initialize each item and map them by their id for quick access
  arr.forEach(item => {
    item.expand = true;
    item.isCompany = item.child_company_id !== null && item.child_company_id !== "" && item.child_company_id !== undefined;

    // Initialize children array to prevent undefined checks later
    item.children = [];

    item.value= item.id;
      item.label = item.struct_name;

    map.set(item.id, item);
  });

  // Second pass to establish parent-child relationships
  arr.forEach(item => {
    const parent = map.get(item.parent_id);
    if (parent) {
      // Check to prevent duplicate children
      if (!parent.children.includes(item)) {
        parent.children.push(item);
      }
    } else {
      // Check to make sure item is not already added to the tree
      if (!tree.includes(item)) {
        tree.push(item);
      }
    }
  });

  // Clean up items that have no children
  map.forEach((value, key) => {
    if (value.children.length === 0) {
      delete value.children;
    }
  });

  return tree;
}
