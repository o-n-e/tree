console.clear()

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

  this.chooseFields = function (id) {
    $scope.nodesToSelect = []

    ivhTreeviewBfs(stuff, function (node) {
      if (!node.children) {
        if (node.selected) {
          $scope.nodesToSelect.push(node)
        }
      }
    })
  }

  this.selectChosen = function (node) {
    alert(node.id)
  }
})
