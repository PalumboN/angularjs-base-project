app.controller("HeaderCtrl", ($state, $translate, $localStorage) => {
  $translate.use($localStorage.lang)

  return {
    isActive: (name) => $state.includes(name),
    changeTranslation: (lang) => {
      $localStorage.lang = lang
      $translate.use(lang)
    }
  }
})

app.controller("FooterCtrl", ($translate) => {
  return {
    changeTranslation: (lang) => $translate.use(lang)
  }
})

app.controller("HeadCtrl", ($translate) => {
})
