<template>
  <div class="w-96 m-auto mt-12">
    <h1 class="text-6xl text-center mb-4">Tic Tac Toe</h1>
    <div class="bg-gray-100 px-4 py-4 w-96 h-96">
      <div v-if="!firstPlayerChip.length">
        <h2 class="text-3xl text-center mb-8 mt-16">Please, choose chip</h2>
        <div class="flex justify-around ml-8 mr-8">
          <div class="border text-blue-500 text-6xl w-28 h-28 flex justify-center items-center cursor-pointer hover:shadow" @click="setFirstPlayerChip(cross)"><p class="mb-0">{{ cross }}</p></div>
          <div class="border text-blue-500 text-6xl w-28 h-28 flex justify-center items-center cursor-pointer hover:shadow" @click="setFirstPlayerChip(zero)"><p class="mb-0">{{ zero }}</p></div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2" v-if="firstPlayerChip.length">
        <div v-for="cell in cells" @click="tickCell(cell.name)" :key="cell.name" class="border text-blue-500 text-6xl w-28 h-28 flex justify-center items-center cursor-pointer"><p class="mb-0">{{ cell.content }}</p></div>
      </div>
    </div>
    <div class="text-center mt-4 relative">
      <div v-if="!finish">
        <p v-if="firstPlayerTurn"><strong>First</strong> player's turn</p>
        <p v-if="!firstPlayerTurn"><strong>Second</strong> player's turn</p>
      </div>
      <div v-if="finish">
        <p class="text-red-500 text-2xl animate-ping" v-if="firstPlayerTurn">First player Win!!!</p>
        <p class="text-red-500 text-2xl animate-ping" v-if="!firstPlayerTurn">Second player Win!!!</p>
        <p></p>
      </div>
      <div class="absolute right-0 -bottom-1">
        <p class="text-gray-200 rounded px-2 py-1 cursor-pointer hover:text-gray-400 border border-white hover:border-gray-400 focus:animate-pulse" @click="reset">Reset</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      finish: false,
      cross: 'X',
      zero: 'O',
      firstPlayerChip: '',
      secondPlayerChip: '',
      firstPlayerTurn: true,
      cells: [
        {'name': 11, 'content': ''},
        {'name': 12, 'content': ''},
        {'name': 13, 'content': ''},
        {'name': 21, 'content': ''},
        {'name': 22, 'content': ''},
        {'name': 23, 'content': ''},
        {'name': 31, 'content': ''},
        {'name': 32, 'content': ''},
        {'name': 33, 'content': ''}
      ],
      winRules: [
          [11,12,13],
          [21,22,23],
          [31,32,33],
          [11,21,31],
          [12,22,32],
          [13,23,33],
          [11,22,33],
          [13,22,31]
      ]
    }
  },
  methods: {
    setFirstPlayerChip(val) {
      this.firstPlayerChip = val;
      if (val === this.cross) {
        this.secondPlayerChip = this.zero;
      } else {
        this.secondPlayerChip = this.cross;
      }
    },
    tickCell(val) {
      if (this.finish) {
        alert('Please restart the game!')
        return false;
      }

      this.cells.map((obj) => {
        if (obj.name === val) {
          if ( obj.content !== '') {
            alert('Please follow the rules!')
            this.firstPlayerTurn = !this.firstPlayerTurn;
            return false;
          }
          if (this.firstPlayerTurn) {
            obj.content = this.firstPlayerChip;
          } else {
            obj.content = this.secondPlayerChip;
          }
        }
      })
      this.checkWin();
      this.firstPlayerTurn = !this.firstPlayerTurn;
    },
    reset() {
      this.firstPlayerTurn = true;
      this.firstPlayerChip = '';
      this.secondPlayerChip = '';
      this.finish = false;
      this.cells.map((obj) => {
        obj.content = '';
      })
    },
    checkWin() {
      let searchable = '';
      if (this.firstPlayerTurn) {
        searchable = this.firstPlayerChip;
      } else {
        searchable = this.secondPlayerChip;
      }

      let ticked = [];

      this.cells.forEach((element) => {
        if (element.content === searchable) {
          ticked.push(element.name);
        }
      });

      if (ticked.length > 2) {
        this.compareArrays(ticked)
      }
    },
    compareArrays(ticked) {
      return this.winRules.forEach((element) => {
        let scores = 0
        element.forEach((cell) => {
          if (ticked.includes(cell)) {
            scores ++;
          }
        })
        if (scores > 2) {
          this.firstPlayerTurn = !this.firstPlayerTurn;
          this.finish = true;
        }
      });
    }
  }
}
</script>

<style>
</style>
