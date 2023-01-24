# 1: assign each agent to be free;
# 2: while some free agent Pi has a non-empty list do
# 3:
#       Pj : first agent on pi's list;
# 4:
#       if some agent Pk is semi-assigned to Pj then
# 5:
#          assign Pk to be free;
# 6:
#       assign Pi to be semi-assigned to Pji
# 7:
#       for each successor P of Pi on Pj's list do
# 8:
#          delete the pair {pmpj);

import random

def generate_data(n):

    data = []

    for i in range(n):

        inner_data = []
        for j in range(n):
            if j != i:
                inner_data.append(j)

        random.shuffle(inner_data)
        
        data.append(inner_data)
    
    return data





def format_data(data_list):
    data = []

    for preferance in (data_list):
        data.append([preferance, None])
            

    return data

def fix_data(d):
    l = [] 
    for row in d:
        inner = []
        for s in row:
            inner.append(int(s))
        l.append(inner)

    return l


data1 = [[2,1,3],
        [3,0,2],
        [1,3,0],
        [0,1,2]] 

data2 = [[1,3,5,2,4],
        [3,4,5,0,2],
        [3,4,5,0,1],
        [5,2,0,4,1],
        [5,2,3,1,0],
        [0,1,3,2,4]]

data3 = [["6","2","4","5","3",],
        ["5","4","1","3","6",],
        ["1","2","5","6","4",],
        ["1","2","6","3","5",],
        ["4","2","1","3","6",],
        ["2","3","5","1","4",]]

data3 = fix_data(data3)


data4 = [[1,2,3],
        [2,0,3],
        [0,1,3],
        [0,1,2]]

# dataG = generate_data(6)
dataG = [[4, 2, 5, 1, 3], [3, 5, 2, 4, 0], [4, 1, 5, 3, 0], [0, 2, 4, 1, 5], [3, 0, 2, 1, 5], [0, 4, 2, 1, 3]]
# print("dataG", dataG)
data = format_data(data4)


print(data, "data")

for d in data:
    print("[", end='')
    for i in d[0]:
        print('"{s}",'.format(s = i + 1), end='')
    print("],")






#function tp print the pairing in a nice way 
def print_pairing():
    global data
    people_printed = []

    for index, person in enumerate(data):
        people_printed.append(index)
        if person[0][0] not in people_printed:
            print("(", index, ",", person[0][0], ")")


#check if anyone is assigned to the person passed in
def assigned_check(assinged):
    global data

    for index, person in enumerate(data):
        if person[1] == assinged:
            return index
    
    return None

# make no one assigned to person_free
#loop through all people checking if they are, if so, assign them to None
def free(person_free):
    global data
    for index, person in enumerate(data):
        if person[1] == person_free:
            data[index][1] = None

#returns list of free agents - people that are not assigened to anyone 
def check_free_agents():
    global data
    free_agents = []

    for index, person in enumerate(data):
        if person[1] == None:
            free_agents.append(index)

    return free_agents

def check_pref_count():
    global data
    many_pref_agents = []

    for index, person in enumerate(data):
        #no stable matching exsits - cant tell this is the reason the prog ended
        # if person[0] == []:
        #     return []

        if len(person[0]) > 1:
            many_pref_agents.append(index)

    return many_pref_agents

def check_pref_empty():
    global data

    for person in data:
        if person[0] == []:
            return True
        
        return False



# delete pair agent1 and agent2, meaning:
# agent1 is deleted from agent2 pref list and vice versa
def delete_pair(agent1, agent2):
    if agent1 in data[agent2][0]:
        data[agent2][0].remove(agent1)

    if agent2 in data[agent1][0]:
        data[agent1][0].remove(agent2)

    return

def match():
    global data
    print(data, "\n") #print data before any processing 

    #PHASE 1 - FIND INITAIL PAIRINGS 

    #list of agents/people - if the list is empty everyone is semi-assigned to someone
    free_agents = []
    for index in range(len(data)):
        free_agents.append(index)

    count = 0

    #while there are free agents
    while free_agents != []:

        #go through each persin
        for index in free_agents:
            
            #if there is no more preferances for a agent/person left - no stable matching exists
            if data[index][0] == []:
                break

            #get their most prefered person
            pref = data[index][0][0]

            # print("pref check ---", index, pref, data[index][0])
            
            #if someone is assigned to their most prefered person, then unassign them and assign current agent to them 
            check = assigned_check(pref)
            if check != None:
                free(pref)
            data[index][1] = pref


            #preferances = the preferacens of the current agents preferance 
            #loop through preferance list in data 
            for list_cut_off_index, preferances in enumerate(data[pref][0]):
                
                #checl for preferacen in list, the ones after this in the list are the ones to remove
                if preferances == index:
                    #remove remaining preferances, in each list 
                    #remove (pref, p)

                    #pref = index of current preferance for the current agent 
                    #p = an index of a person tp remove 

                    # print(index, pref)
                    for p in data[pref][0][list_cut_off_index + 1:]:
                        # print(index, "del", p, pref, data[pref][0])
                        delete_pair(p, pref)
                        # print(p , "---", data[p][0])
                        # print(pref , "---", data[pref][0])



                    ##Dont need to loop through the rest of the list - since we do the loop after the check                    
                    break
                
            #update list of people waiting to be assigned 
            free_agents = check_free_agents()


            #print(data, "\n")   #Print the data at each step of assinging 
        count = count + 1
        if count > 100:
            print("No Stable Mathcing")
            return
    # print("data", data)

    print("PHASE 1 DONE")

    #PHASE 2 - FIND ROATATION AND REDUCE LISTS

    many_pref_agents = check_pref_count()


    #while there are agents with more than 1 prefrance left
    while many_pref_agents != []:

        #loop through remaing agents 
        for agent in many_pref_agents:
            
            rotation_pairs = []

            print(1, data)
            print(2, agent)
            print(3, data[agent])
            print(4, many_pref_agents)

            # ISSUE IS LOOK LIST IS UPDATED IN THE LIST, BUT UPDATE IS NOT REFLECTED IN LOOP 

            if data[agent] not in many_pref_agents:
                pass

            starting_agent = agent                  #A - Starting Agent
            second_pref = data[agent][0][1]         #X - Second preferance of A
            last_pref = data[second_pref][0][-1]    #Y - Last preferance of X
            rotation_pairs.append([last_pref, second_pref])
            
            #Assuming garanteed loop
            #Loop until there is a loop through people back to the first person - indicated a rotation
           
            counter = 0
            while starting_agent != last_pref:

                counter += 1


                #stops infinite loops 
                if counter > len(data):
                    break

                second_pref = data[last_pref][0][1]
                last_pref = data[second_pref][0][-1]
                
                # if last_pref == data[second_pref][0][-1]:
                #     break

                rotation_pairs.append([last_pref, second_pref])                    

            #delete pairs involved in rotation
            deleted_pairs = []
            for pair in rotation_pairs:

                #accounts for duplicated pairs 
                if pair not in deleted_pairs:
                    delete_pair(pair[0], pair[1])
                    deleted_pairs.append(pair)
                else:
                    break

            
            #Phase 2 loop conditions 
            #checks that there is a preferance list with more than 1 entry - ends loop with stable macthign 
            many_pref_agents = check_pref_count()
            if many_pref_agents == []:
                break
            
            #checks there are no preferance lists thay are empty - ends loop with no stable matching 
            if check_pref_empty == True:
                print("No Stable Matchig")
                break
            
            break
            
    #print(data)



match()
print_pairing()

