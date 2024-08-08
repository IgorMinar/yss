import {tokenize} from './di';

describe('di', () => {
  describe('di token', () => {
    it('should be trivial to create', () => {
      class Engine {
        start() {}
        stop() {}
        setRpm() {}
      }

      const engineRef = tokenize(Engine);

      

      async function revEngine(engine: typeof engineRef) {
        const x = new engine();
        x.setRpm();
      }

      class Car {
        constructor(private engine: Engine) {}

        toString() {
          return this.engine.start() + '';
        }
      }

      class Car2 {
        constructorx({engine: Engine, revEngine: typeof revEngine}) {

        }
      }

      /**
       * @type {import('@sveltejs/kit').Load}
       */
      function makeCar({engine, rev}) {
        return engine + rev;
      }

      const c = new Car(new Engine());
    });

    it('should be typesafe', () => {});

    it('should be lightweight', () => {});
  });
});
