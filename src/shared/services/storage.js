export const getItemLS = key => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
  return null
}

export const setItemLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeItemLS = key => {
  localStorage.removeItem(key)
}

export const clearLS = () => {
  localStorage.clear()
}
