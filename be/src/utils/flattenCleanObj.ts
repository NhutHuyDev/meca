export default function flattenCleanObj(obj: any, parent?: any, convertObj: any = {}) {
  if (obj !== undefined && obj !== null) {
    Object.keys(obj).forEach((k) => {
      const nestedPropKey = parent ? `${parent}.${k}` : k

      if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
        flattenCleanObj(obj[k], nestedPropKey, convertObj)
      } else {
        if (obj[k] !== undefined && obj[k] !== null) convertObj[nestedPropKey] = obj[k]
      }
    })
  }

  return convertObj
}

// {
//     a: 1,
//     b: {
//         b1: 2,
//         b2: null
//     }
// }

// =>

// {
//     a: 1,
//     b.b1: 2,
// }
