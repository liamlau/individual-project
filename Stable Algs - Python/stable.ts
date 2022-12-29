for (let i = 0 ; i < pref.ranking.length ; i++){
          
    //check for preferacen in list, the ones after this in the list are the ones to remove
    if (pref.ranking[i] == person){
      // remove remaining preferances, in each list 
      // remove (pref, p)

      // pref = index of current preferance for the current agent 
      // p = an index of a person tp remove 

      // need to get splice of list 
      console.log("del", person.name, pref.name)
      let len = pref.ranking.length
      for (let j = i + 1; j < len ; j++){

        let pref_ranking = this.originalGroup1CurrentPreferences.get(this.getLastCharacter(pref.name))
        
        console.log(person.name,"del", pref.ranking[j].name, pref.name, pref_ranking)


        this.originalGroup1CurrentPreferences[pref.name]

        // this.changePreferenceStyle(
        //   this.group1CurrentPreferences,
        //   this.getLastCharacter(pref.name), 
        //   Number(j), 
        //   "grey")

        // console.log("number check", person.name, this.getLastCharacter(person.name), Number(this.getLastCharacter(person.name)) - 1)

        // this.changePreferenceStyle(
        //   this.group1CurrentPreferences,
        //   this.getLastCharacter(pref.ranking[j].name), 
        //   Number(pref.ranking[j].ranking.indexOf(pref)), //get pos in ranking index of perf in person or vise versa
        //   "grey")

          // once pref list chnage then so does index, this is based on g1 prefs without deletion need to use that for referance 

          // index of pref within pref.ranking[j]

        // remove c from p's list and remove p from c's list
        this.update(10)

        // let tempagent = pref.ranking[j]

        this.delete_pair(pref, pref.ranking[j]);
     
        // this.print_rankings(pref)
        // console.log("\n")
        // this.print_rankings(tempagent)
      }

      break;

    }
  }