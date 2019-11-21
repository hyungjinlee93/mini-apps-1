class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleAccountCreation = this.handleAccountCreation.bind(this);
    this.handleAddressCreation = this.handleAddressCreation.bind(this);
    this.handlePaymentCollection = this.handlePaymentCollection.bind(this);
  }

  handleNext = () => {
    this.state.stage++;
    if(this.state.stage > 2) {
      debugger;
      this.state = {stage: 0};
    }
    this.setState((state) => (state));
  }

  handleAccountCreation = (e) => {
    e.preventDefault();
    let name = this.state.name =e.target[0].value;
    let email = this.state.email = e.target[1].value;
    let password = this.state.password = e.target[2].value;
    let stringy = JSON.stringify({name: name, email: email, password: password});
    fetch('/createaccount',{
      method: 'POST',
      body: stringy,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        this.state.stage++;
        this.setState((state) => (state));
      })
      .catch((err) => {
        debugger;
      });
  }

  handleAddressCreation = (e) => {
    e.preventDefault();
    let homezip = e.target[4].value;
    let phone = e.target[5].value;
    let reg = /^\d+$/;
    if (homezip.length != 5 || !reg.test(homezip)) {
      alert('Invalid Zip');
    } else if (phone.length != 10 || !reg.test(phone)) {
      alert('Invalid Phone');
    } else {
      let addr = this.state.addr = e.target[0].value;
      if (e.target[1].value.length) {
        addr +='\n' + e.target[1].value;
        this.state.addr += '\n' + e.target[1].value;
      }
      let city = this.state.city = e.target[2].value;
      let state = this.state.state = e.target[3].value;
      this.state.homezip = e.target[4].value;
      this.state.phone = e.target[5].value;
      let stringy = JSON.stringify({email: this.state.email, homezip: homezip, phone: phone, city: city, state: state});
      fetch('/updateaccount',{
        method: 'POST',
        body: stringy,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.state.stage++;
          this.setState((state) => (state));
        })
        .catch((err) => {
          debugger;
        });
    }
  }

  handlePaymentCollection = (e) => {
    e.preventDefault();
    let ccnum = e.target[0].value;
    let ccdate = e.target[1].value;
    let ccems = new Date(ccdate);
    let nowms = new Date();
    let cccvv = e.target[2].value;
    let billingzip = e.target[3].value;
    let reg = /^\d+$/;
    if(!reg.test(ccnum)){
      alert('Invalid Credit Card Number');
    } else if (ccems.getTime() < nowms.getTime()){
      alert('Expired Credit Card');
    } else if (!reg.test(cccvv)) {
      alert('Invalid CVV');
    } else if (billingzip.length != 5 || !reg.test(billingzip)) {
      alert('Invalid Zip');
    } else {
      this.state.ccnum = ccnum;
      this.state.ccdate = ccdate;
      this.state.cccvv = cccvv;
      this.state.billingzip = billingzip;
      let stringy = JSON.stringify({email: this.state.email, ccnum: ccnum, ccdate: ccdate, cccvv: cccvv, billingzip: billingzip});
      fetch('/updateaccount',{
        method: 'POST',
        body: stringy,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.state.stage++;
          this.setState((state) => (state));
        })
        .catch((err) => {
          debugger;
        });
    }
  }

  render() {
    return (
      <div>
        <Stage stage={this.state.stage} nextFn={this.handleNext} createAccount={this.handleAccountCreation} createAddress={this.handleAddressCreation} collectPayment={this.handlePaymentCollection} information={this.state}/>
      </div>
    );
  }
}

var Stage = (props) => {
  const stage = props.stage;
  if (stage === 0) {
    return (
      <div>
        <div>Homepage</div>
        <p><button onClick={props.nextFn}>Checkout</button></p>
      </div>
    );
  } else if (stage === 1) {
    return (
      <div>
        <div>Create Account</div>
        <AccountCreation create={props.createAccount} />
      </div>
    );
  } else if (stage === 2) {
    return (
      <div>
        <div>Enter Shipping Address</div>
        <AddressCollection collect={props.createAddress} />
      </div>
    );
  } else if (stage === 3) {
    return (
      <div>
        <div>Enter Payment</div>
        <CCCollection pay={props.collectPayment}/>
      </div>
    );
  } else if (stage === 4) {
    return (
      <div>
        <p>Confirmation</p>
        <Confirmation info={props.information} purchasefn={props.nextFn}/>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

var Confirmation = (props) => {
  return (
    <div>
      <div className="AddressConfirm">
        Shipping Address:
        <p>{props.info.name}</p>
        <p>{props.info.addr}</p>
        <p>{props.info.city} {props.info.state} {props.info.homezip}</p>
        <p>{props.info.phone.substring(0,3)}-{props.info.phone.substring(3,6)}-{props.info.phone.substring(6)}</p>
      </div>
      <div className="BillConfirm">
        Bill To:
        <p>••••••••••••••••{props.info.ccnum.substring(props.info.ccnum.length-4)}</p>
        <p>{props.info.billingzip}</p>
      </div>
      <button onClick={props.purchasefn}>Purchase</button>
    </div>
  )
}

var CCCollection = (props) => {
  return (
    <form onSubmit={props.pay}>
      <p>Enter Credit Card#: <input type="text" id="ccnumber" required placeholder="Credit Card Number" /></p>
      <p>Enter Expiry Date: <input type="date" id="ccdate" required /></p>
      <p>Enter CVV: <input type="password" id="cccvv" required placeholder="CVV" /></p>
      <p>Enter Billing ZipCode: <input type="text" id="billzip" required placeholder="Zip Code" /></p>
      <input type="submit" value="Next" />
    </form>
  );
}

var AccountCreation = (props) => {
  return (
    <form onSubmit={props.create}>
      <p>Enter name: <input type="text" id="name" required placeholder="Name" /></p>
      <p>Enter email: <input type="text" id="email" required placeholder="Email" /></p>
      <p>Create password: <input type="password" id="password" required placeholder="Password" /></p>
      <input type="submit" value="Next" />
    </form>
  );
}

var AddressCollection = (props) => {
  return (
    <form onSubmit={props.collect}>
      <p>Enter Address Line 1: <input type="text" id="addrline1" required placeholder="Address Line 1" /></p>
      <p>Enter Address Line 2: <input type="text" id="addrline2" placeholder="Address Line 2" /></p>
      <p>Enter City: <input type="text" id="addrcity" required placeholder="City" /></p>
      <p>Pick State:<select>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
      </p>
      <p>Enter Zip Code: <input type="text" id="addrzip" required placeholder="Zip Code" /></p>
      <p>Enter Phone Number (10 Numbers Only No Space): <input type="text" id="addrphone" required placeholder="Phone Number" /></p>
      <input type="submit" value="Next" />
    </form>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));