import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView
} from "react-native";

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

class RoundButton extends React.Component {
  static defaultProps = {
    textColor: "black"
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.03)"
        onPress={this.props.onPress}
        style={styles.roundButton}
        disabled={this.props.disabled}
      >
        <Text style={{ fontSize: 19, color: this.props.textColor }}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pqCronometro: 0,
      grdCronometro: 0,
      voltas: ["", "", "", "", "", ""],
      btn1Status: false,
      btn2Status: false
    };
  }

  timer = null;

  time() {
    let x = this.state.grdCronometro;
    x++;
    let y = this.state.pqCronometro;
    y++;
    this.setState({ grdCronometro: x, pqCronometro: y });
    this.timer = setTimeout(this.time.bind(this), 10);
  }

  handleCronometro = () => {
    let btn2Status = !this.state.btn2Status;
    if (btn2Status) {
      this.time();
    } else {
      clearInterval(this.timer);
    }
    let btn1Status = !this.state.btn1Status;
    this.setState({ btn2Status, btn1Status });
  };

  handleVoltas = () => {
    let btn1Status = this.state.btn1Status;
    if (btn1Status) {
      let voltas = this.state.voltas;
      voltas.pop();
      voltas.unshift(this.transformIntToCronometro(this.state.pqCronometro));
      this.setState({ voltas, pqCronometro: 0 });
    } else {
      this.setState({
        pqCronometro: 0,
        grdCronometro: 0,
        voltas: ["", "", "", "", "", ""],
        btn1Status: false,
        btn2Status: false
      });
    }
  };

  transformIntToCronometro(number) {
    let x = Math.floor(number / 100);
    let y = number % 100;
    if (x < 10) {
      if (y < 10) return "00:0" + x.toString() + ".0" + y.toString();
      else return "00:0" + x.toString() + "." + y.toString();
    } else {
      if (y < 10) return "00:" + x.toString() + ".0" + y.toString();
      else return "00:" + x.toString() + "." + y.toString();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={"iOS Timer"} />
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.textVolta}>
              {this.transformIntToCronometro(this.state.pqCronometro)}
            </Text>
            <Text style={styles.textBig}>
              {this.transformIntToCronometro(this.state.grdCronometro)}
            </Text>
          </View>
        </View>

        <View
          style={{ height: StyleSheet.hairlineWidth, backgroundColor: "#ccc" }}
        />

        <View style={{ backgroundColor: "#eee", flex: 3 }}>
          <View style={styles.buttonContainer}>
            <RoundButton
              onPress={this.handleVoltas}
              text={this.state.btn1Status ? "Volta" : "Zerar"}
            />
            <RoundButton
              onPress={this.handleCronometro}
              text={this.state.btn2Status ? "Pausar" : "Iniciar"}
              textColor={this.state.btn2Status ? "red" : "green"}
            />
          </View>

          <View style={{ flex: 2 }}>
            {this.state.voltas.map((item, index) => {
              return (
                <View key={item + "_" + index.toString()} style={{ flex: 1 }}>
                  <View style={styles.voltaContainer}>
                    {item !== "" && (
                      <Text style={{ color: "gray" }}>
                        {"Volta " + (index + 1).toString()}
                      </Text>
                    )}
                    <Text>{item}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 25
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  voltaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 15,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc"
  },
  roundButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 80,
    width: 80
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textVolta: {
    fontSize: 18,
    color: "#ccc",
    fontWeight: "100"
  },
  textBig: { fontSize: 76, fontWeight: "100" }
});
