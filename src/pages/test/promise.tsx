import React, { useEffect } from 'react';

function PromiseComp() {
  /*new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  }).then(val => {
    console.log(val); //  参数val = 'hello'
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world');
      }, 2000);
    });
  }).then(val => {
    console.log(val); // 参数val = 'world'
  });*/
  /*let pro = new Promise(resolve => {
    setTimeout(() => {
      resolve('hello world')
    }, 2000)
  })
  setTimeout(() => {
    pro.then(value => {
      console.log(value) // hello world
    })
  }, 2000)*/
  /*new Promise((resolve) => {
    setTimeout(() => {resolve(1)}, 2000)
  }).then(() => {
    console.log(('test err'));
    throw new Error('test err')
  }).catch((err) => {
    console.log(err)
  }).then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  }).catch((err) => {
    console.log('i catch ', err);
  })*/
  /*new Promise((resolve) => {
    setTimeout(() => {resolve(1)}, 2000)
  }).then(() => {
    console.log(('test err'));
    throw new Error('test err')
  }).catch((err) => {
    console.log(err)
    throw new Error('test err， catch')
  }).then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  }).catch((err) => {
    console.log('i catch ', err);
  })*/
  /*try {
    new Promise((resolve) => {
      setTimeout(() => {resolve(1)}, 2000)
    }).then(() => {
      console.log(('test err'));
      throw new Error('test err')
    }).catch((err) => {
      console.log(err)
    }).then(() => {
      console.log(2);
      throw new Error('test err-----2')
    }).then(() => {
      console.log(3);
    }).catch((err) => {
      console.log('i catch ', err);
      throw new Error('test err----- catch')
    }).then(() => {
      console.log(3);
    }, (err) => {
      console.log('err, reject', err);
    }).catch((err) => {
      console.log('after i catch ', err);
    })
  } catch (e) {
    console.log('try...catch', e);
  }*/
  /*try {
    Promise.reject('出错了');
  } catch(e) {
    console.log(e)
  }*/
  /*(async () => {
    try {
      // await Promise.reject('出错了')
      Promise.reject('出错了');
    } catch (e) {
      console.log(e);
    }
  })();*/
  /*(async () => {
    try {
      // await Promise.reject('出错了')
      Promise.reject('出错了').catch(err => {
        console.log(err, 2);
      });
      console.log(1);
    } catch (e) {
      console.log(e);
    }
  })();*/
  setTimeout(()=>{
    // console.log(a.b);
    console.log(123);
  }, 1000)
  return <div>123</div>;
}

export default PromiseComp;
