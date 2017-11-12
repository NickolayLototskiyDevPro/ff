let ProjectModule = (function() {
    
        const project = {
            participants: [],
            pricing: {},
            isBusy: false,
    
            init(participants, pricing) {
                if (!participants || !pricing) {
                    return;
                }
                this.participants = participants;
                this.pricing = pricing;
            },
    
            findParticipant(functor, callbackFunction) {
                if (this.isBusy) {
                    return false;
                }
                this.isBusy = true;
                let participant = this.participants.find(functor);
                let arg = participant ? participant : null;
    
                setTimeout(() => {
                    this.isBusy = false;
                    callbackFunction(arg);
                }, 200);
            },
    
            findParticipants(functor, callbackFunction) {
                if (this.isBusy) {
                    return false;
                }
    
                this.isBusy = true;
                let participants = this.participants.filter(functor);
                let arg = participants ? participants : null;
    
                setTimeout(() => {
                    this.isBusy = false;
                    callbackFunction(arg);
                }, 200);
            },
    
            addParticipant(participantObject, callbackFunction) {
                if (this.isBusy) {
                    return false;
                }
                this.isBusy = true;
                let err;
                if (participantObject.seniorityLevel) {
                    this.participants.push(participantObject);
                } else {
                    err = "error";
                }
    
                setTimeout(() => {
                    this.isBusy = false;
                    callbackFunction(err);
                }, 200);
            },
    
            removeParticipant(participantObject, callbackFunction) {
                if (this.isBusy) {
                    return false;
                }
                this.isBusy = true;
                let deleteIndex = -1;
                for (var i = 0; i < this.participants.length; i++) {
                    if (this.participants[i] == participantObject) {
                        deleteIndex = i;
                        break;
                    }
                }
                let arg = null;
                if (deleteIndex !== -1) {
                    arg = this.participants.splice(deleteIndex, 1)[0];
                }
    
                setTimeout(() => {
                    this.isBusy = false;
                    callbackFunction(arg);
                }, 200);
            },
    
            setPricing(participantPriceObject, callbackFunction) {
                if (this.isBusy) {
                    return false;
                }
                this.isBusy = true;
                this.pricing = participantPriceObject;
    
                setTimeout(() => {
                    this.isBusy = false;
                    callbackFunction();
                }, 50);
            },
    
            calculateSalary(periodInDays) {
                var val = 0;
                var WorkHours = 8;
                var saleryCalc = 0;
                for (var i = 0; i < this.participants.length; i++) {
                    if (this.participants[i].seniorityLevel in this.pricing) {
                        let level = this.participants[i].seniorityLevel;
                        val += this.pricing[level] * WorkHours;
                    } else {
                        throw Error;
                    }
                }
                saleryCalc = val * periodInDays;
                return saleryCalc;
            }
    
        }
    
        let instance,
            createInstance = () => project,
            getInstance = () => instance || (instance = createInstance());
    
        return getInstance();
    })();
    
    
    module.exports = {
        firstName: 'Andrei',
        lastName: 'Kryvoruka',
        task: ProjectModule
    }