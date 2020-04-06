class Hero {
    private name: string;
    private health: number;
    private maxHealth: number = 100;

    constructor(name: string, health: number = 100) {
      this.name = name;
      if (health < this.maxHealth) {
        this.health = health;
      } else {
        this.health = this.maxHealth;
      }
    }

    public attacked(attackValue: number) {
      if (attackValue >= this.health) {
        console.log(`${this.name} is no more.`);
      } else {
        this.health -= attackValue;
        console.log(`Hero attacked: ${attackValue} -- remains ${this.health}`);
      }
    }

    public heal(healValue: number) {
      if (this.health + healValue > this.maxHealth) {
        console.log(`${this.name} has max health of ${this.maxHealth}`);
      } else {
        this.health += healValue;
        console.log(`${this.name} healed to ${healValue}`);
      }
    } 
  }

  class Villian {
    private name: string;
    private health: number;
    private maxHealth: number = 100;

    constructor(name: string, health: number = 100) {
      this.name = name;
      if (health < this.maxHealth) {
        this.health = health;
      } else {
        this.health = this.maxHealth;
      }
    }

    public rampage() {
      if (this.health <= 10) {
        this.health = this.maxHealth * .9;
        console.log(`${this.name} restored health to ${this.health}`);
      } else {
        console.log(`${this.name} is not weak enough`);
      }
    }

    public attacked(attackValue: number) {
      if (attackValue >= this.health) {
        console.log(`${this.name} is no more.`);
      } else {
        this.health -= attackValue;
        console.log(`Villian attacked: ${attackValue} -- remains ${this.health}`);
      }
    }

    public heal(healValue: number) {
      if (this.health + healValue > this.maxHealth) {
        console.log(`${this.name} has max health of ${this.maxHealth}`);
      } else {
        this.health += healValue;
        console.log(`${this.name} healed to ${healValue}`);
      }
    } 
  }
  
  interface IHeroOptions {
    type: 'hero' | 'villian',
    name: string;
    health?: number
  }

  class SuperHeroFactory {
    createSuperHero(heroOptions: IHeroOptions & { type: 'hero' }): Hero;
    createSuperHero(heroOptions: IHeroOptions & { type: 'villian' }): Villian;

    public createSuperHero(heroOptions: IHeroOptions): Hero | Villian {
      console.log(`New ${heroOptions.type} ${heroOptions.name} appeared!`)
      if (heroOptions.type === 'hero') {
        const hero = new Hero(heroOptions.name, heroOptions.health);
        return hero;
      } else if (heroOptions.type === 'villian') {
        const villian = new Villian(heroOptions.name, heroOptions.health);
        return villian;
      }
    }
  }

  const superHeroFactory = new SuperHeroFactory();

  const batman = superHeroFactory.createSuperHero({ name: 'Batman', type: 'hero'});

  const joker = superHeroFactory.createSuperHero({ name: 'Joker', health: 50, type: 'villian'});

  batman.attacked(40);
  joker.attacked(40);
  joker.rampage();
  batman.attacked(60);