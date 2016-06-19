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
  this.stuff = stuff
  this.dataCache = dataCache
  this.selectedFieldsAvailableValues = []

  this.chooseFields = function (id) {
    $scope.selectedFields = []

    ivhTreeviewBfs(stuff, function (node) {
      if (!node.children) {
        if (node.selected) {
          console.log(node.id)
          $scope.selectedFields.push(node)
        }
      }
    })
  }

  $scope.getSelectedField = function (selectedField) {
    console.log(selectedField)

    var myObj = {}

    for (var a = 0; a < dataCache.length; a++) {
      console.log('a: ' + a)

      myObj = dataCache[a]
      console.log('myObj.id: ' + myObj.id)
      console.log('selectedField[0]: ' + selectedField[0])
      if (myObj.id === selectedField[0]) {
        console.log('found')
        this.selectedFieldsAvailableValues = dataCache[a].vals
        break
      }
    }
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
