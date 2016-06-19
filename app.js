// console.clear()

var stuff = [{
  label: 'A',
  children: [
    {label: 'AA',
     children: [
       {label: 'AAA', id: 'aaa'},
       {label: 'AAB', id: 'aab'}
     ]},
    {label: 'AB',
     children: [
       {label: 'ABA', id: 'aba'}
     ]}
  ]
}, {
  label: 'B',
  children: [
    {label: 'BA',
     children: [
       {label: 'BAA', id: 'baa'},
       {label: 'BAB', id: 'bab'},
       {label: 'BAC', id: 'bac'}
     ]},
    {label: 'BB',
     children: [
       {label: 'BBA', id: 'bba'},
       {label: 'BBB', id: 'bbb'}
     ]}
  ]
}, {
  label: 'C',
  children: [
    {label: 'CA',
     children: [
       {label: 'CAA', id: 'caa'},
       {label: 'CAB', id: 'cab'}
     ]},
    {label: 'CB',
     children: [
       {label: 'CBA', id: 'cba'},
       {label: 'CBB', id: 'cbb'}
     ]}
  ]
}, {
  label: 'D',
  children: [
    {label: 'DA', id: 'da'},
    {label: 'DB', id: 'db'}
  ]
}]

var dataCache = [
  {id: 'aaa', vals: ['alpha', 'beta', 'delta', 'gamma']},
  {id: 'aab', vals: ['epsilon', 'feta', 'omicron', 'telta']},
  {id: 'aba', vals: ['blue', 'green', 'yellow', 'orange']},
  {id: 'baa', vals: ['cat', 'dog', 'giraffe', 'monkey']},
  {id: 'bab', vals: [1, 3, 4, 6]},
  {id: 'bac', vals: ['eleven', 'three', 'twenty', 'two']},
  {id: 'bba', vals: ['durga', 'kali', 'krishna', 'shiva']},
  {id: 'bbb', vals: ['mercury', 'moon', 'sun', 'venus']},
  {id: 'caa', vals: [3, 34, 404, 909]},
  {id: 'cab', vals: ['acdc', 'bon jovi', 'can', 'duran duran']},
  {id: 'cba', vals: ['aligaitor', 'crocodile', 'snake', 'tapir']},
  {id: 'cbb', vals: ['cumulus', 'cumulonimbus', 'lenticular', 'stratus']}
]

var app = angular.module('bin', ['ivh.treeview'])

app.config(function (ivhTreeviewOptionsProvider) {
  ivhTreeviewOptionsProvider.set({
    defaultSelectedState: false,
    validate: true,
    expandToDepth: 0
  })
})

app.controller('DemoCtrl', function (ivhTreeviewBfs, ivhTreeviewMgr, $scope, $timeout) {
  $scope.stuff = stuff
  $scope.dataCache = dataCache
  $scope.selectedFieldsAvailableValues = []
  $scope.valueCache = []

  $scope.chooseFields = function (id) {
    $scope.selectedFields = []

    ivhTreeviewBfs($scope.stuff, function (node) {
      if (!node.children) {
        if (node.selected) {
          console.log(node.id)
          $scope.selectedFields.push(node)
        }
      }
    })
  }

  $scope.getSelectedFieldsValues = function (selectedField) {
    console.log(selectedField)
    $scope.selectedFieldsAvailableValues = []
    var foundInCache = false

    var myObj = {}
    // get from the cache or fetch from db and add to it
    for (var i = 0; i < $scope.valueCache.length; i++) {
      myObj = $scope.valueCache[i]
      if (myObj.id === selectedField[0]) {
        console.log('found in cache')
        foundInCache = true
        $scope.selectedFieldsAvailableValues = $scope.valueCache[i].vals
        break
      }
    }

    if (foundInCache === false) {
      for (var a = 0; a < $scope.dataCache.length; a++) {
        console.log('a: ' + a)

        myObj = $scope.dataCache[a]
        console.log('myObj.id: ' + myObj.id)
        console.log('selectedField[0]: ' + selectedField[0])
        if (myObj.id === selectedField[0]) {
          console.log('found in db')
          $scope.selectedFieldsAvailableValues = $scope.dataCache[a].vals
          console.log('adding to valueCache')
          $scope.valueCache.push($scope.dataCache[a])
          break
        }
      }
    }
  }

  $scope.addValue = function (vl) {
    alert('addValue' + vl)
  }

  $scope.removeField = function (field) {
    console.log('field: ' + field)
    for (var i = 0; i < $scope.selectedFields.length; i++) {
      console.log('i: ' + i)
      var selectedField = $scope.selectedFields[i].id
      console.log('selectedField: ' + selectedField)
      if (selectedField === field) {
        console.log('GOT IT')
        console.log('removing: ' + $scope.selectedFields[i].id)
        $scope.selectedFields.splice(i, 1)
        break
      }
    }
    console.log('Calling getSelectedField for : ' + $scope.selectedFields[0].id)
    $scope.getSelectedField($scope.selectedFields[1].id)
  }
})
