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

# OLD VERSION 





def format_data(data_list):
    data = []

    for preferance in (data_list):
        data.append([preferance, "free", None])
            

    return data


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

data = format_data(data2)
print(data)
print("----------------------------")


#check if anyone is assigned to the person passed in
def assigned_check(assinged):
    global data

    for index, person in enumerate(data):
        if person[2] == assinged:
            return index
    
    return None

# make no one assigned to person_free
#loop through all people checking if they are, if so, assign them to None
def free(person_free):
    global data
    for index, person in enumerate(data):
        if person[2] == person_free:
            data[index][2] = None

#returns list of free agents - people that are not assigened to anyone 
def check_free_agents():
    global data
    free_agents = []

    for index, person in enumerate(data):
        if person[2] == None:
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
    #PHASE 1 - FIND INITAIL PAIRINGS 

    #list of agents/people - if the list is empty everyone is semi-assigned to someone
    free_agents = []
    for index in range(len(data)):
        free_agents.append(index)


    
    # print(data)


    #while there are free agents
    while free_agents != []:

        #go through each persin
        for index in free_agents:
            
            #if there is no more preferances for a agent/person left - no stable matching exists
            if data[index][0] == []:
                break

            #get their most prefered person
            pref = data[index][0][0]
            
            #if someone is assigned to their most prefered person, then unassign them and assign current agent to them 
            check = assigned_check(pref)
            if check != None:
                free(pref)
            data[index][2] = pref


            #preferances = the preferacens of the current agents preferance 
            #loop through preferance list in data 
            for list_cut_off_index, preferances in enumerate(data[pref][0]):
                
                #checl for preferacen in list, the ones after this in the list are the ones to remove
                if preferances == index:
                    #remove remaining preferances, in each list 
                    #remove (pref, p)

                    #pref = index of current preferance for the current agent 
                    #p = an index of a person tp remove 
                    for p in data[pref][0][list_cut_off_index + 1:]:
                        delete_pair(p, pref)



                    ##Dont need to loop through the rest of the list - since we do the loop after the check                    
                    break
                
            #update list of people waiting to be assigned 
            free_agents = check_free_agents()

    #PHASE 2 - FIND ROATATION AND REDUCE LISTS

    many_pref_agents = check_pref_count()


    #while there are agents with more than 1 prefrance left
    while many_pref_agents != []:

        #loop through remaing agents 
        for agent in many_pref_agents:
            
            rotation_pairs = []

            starting_agent = agent                  #A - Starting Agent
            second_pref = data[agent][0][1]         #X - Second preferance of A
            last_pref = data[second_pref][0][-1]    #Y - Last preferance of X
            rotation_pairs.append([last_pref, second_pref])

            #Assuming garanteed loop
            #Loop until there is a loop through people back to the first person - indicated a rotation
            while starting_agent != last_pref:
                second_pref = data[last_pref][0][1]
                last_pref = data[second_pref][0][-1]
                rotation_pairs.append([last_pref, second_pref])
            

            #delete pairs involved in rotation
            for pair in rotation_pairs:
                delete_pair(pair[0], pair[1])


            # print("Pairs", agent, rotation_pairs)

            many_pref_agents = check_pref_count()
            if many_pref_agents == []:
                break
            
    print(data)






match()

