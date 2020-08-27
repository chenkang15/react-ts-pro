import React from 'react';
class Body { }
class Chassis { }
class Engine {
  start() {
    console.log("引擎发动了");
  }
}
class Car {
  engine: Engine;
  chassis: Chassis;
  body: Body;

  constructor() {
    this.engine = new Engine();
    this.body = new Body();
    this.chassis = new Chassis();
  }

  run() {
    this.engine.start();
  }
}

const Di:React.FC<{}> = (props) => {
  const car = new Car(); // 阿宝哥造辆新车
  car.run(); // 控制台输出：引擎发动了
  console.log(React.Children.count(props.children));
  // return React.Children.count(props.children) ? props.children : <div>Di</div>
  return <div>Di</div>


}
class DiCar {
  body: Body;
  engine: Engine;
  chassis: Chassis;

  constructor(engine, body, chassis) {
    this.engine = engine;
    this.body = body;
    this.chassis = chassis;
  }

  run() {
    this.engine.start();
  }
}
const DiCarComp:React.FC<{}> = (props) => {
  const engine = new Engine();
  const body = new Body();
  const chassis = new Chassis();

  const newCar = new DiCar(engine, body, chassis);
  newCar.run();

  // return React.Children.count(props.children) ? props.children : <div>Di</div>
  return <div>Di</div>


}
export default Di;
