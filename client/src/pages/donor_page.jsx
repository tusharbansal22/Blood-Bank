import React from 'react'

function donor(){
    return(
        <div>
            <div style="position: relative; width: 100%;">
        <img style="width: 50px; height: 50px; margin-left: 50px; margin-top: 10px;"src="https://cdn-icons-png.flaticon.com/512/2717/2717096.png"/>
        <button class="buttonn"> Main Page</button>
            </div>
            <div class="move">
            <p class="text">Be the reason for someone's heartbeat...</p>
    <img class="text" style="top: 200px; height: 400px; width: 500px;" src="https://img.freepik.com/premium-vector/woman-donating-blood-illustration_227564-264.jpg?w=740"/>
        <form>
        <label>
            Enter your First Name:
        </label><br/><input class="input" name="firstname" type="text" placeholder="First Name..."/>
        <br/>
        <label>
            Enter your Second Name:</label><br/><input class="input" name="secondname" placeholder="Second Name..."/>
        <br/>
        <label>
            Enter your age:</label><br/><input class="input" name="age" placeholder="Age..."/>
        <br/>
        <label>
            Enter the city name you belong to:</label><br/><input class="input" name="city" placeholder="City..."/>
        <br/>
        <label>
            Enter your Phone number:</label><br/><input class="input" name="ph.no" placeholder="Ph.no..."/>
        <br/>
        <label>
            Enter your Blood group:</label><br/><input class="input" name="bloodgroup" placeholder="Blood type..."/>
        <br/>
        <br/>
        <input class="submit" type="submit" name="Sub" />
        </form>
        </div>
        </div>
    )
}
