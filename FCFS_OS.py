#FCFS/FIFO
#Process : [arrival_time,waiting_time,pid]
def FCFS(process_list):
    t = 0
    gantt = []
    completed = {}
    
    # Sort process list based on arrival time
    process_list.sort(key=lambda x: x[0])
    
    while process_list:
        if process_list[0][0] > t:
            t += 1
            gantt.append("Idle")
        else:
            process = process_list.pop(0)
            pid = process[2]
            arrival_time = process[0]
            burst_time = process[1]
            
            # Process starts execution
            gantt.append(pid)
            t += burst_time
            
            # Calculate times
            ct = t
            tt = ct - arrival_time
            wt = tt - burst_time
            completed[pid] = [ct, tt, wt]
    
    print("Gantt Chart:", gantt)
    print("Completed Processes:", completed)

# Sample process list for test
sample_list = [[2, 6, "P1"], [1, 3, "P2"], [0, 4, "P3"], [4, 2, "P4"], [5, 3, "P5"]]
FCFS(sample_list)     
process_list = eval(input("Enter a process list"))
FCFS(process_list)