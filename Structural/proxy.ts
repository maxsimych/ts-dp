interface Loggable {
  log(action: string): void;
}


class Logger implements Loggable {
  private userPermission: string;

  constructor(userPermission: string) {
    this.userPermission = userPermission;
  }

  public log(action: string): void {
    console.log(`User with permission ${this.userPermission} logging ${action}`);
  }
}

class LoggerProxy implements Loggable {
  private userPermission: string;

  constructor(userPermission: string) {
    this.userPermission = userPermission;
    this.checkAccess(userPermission);
  }

  public log(action: string, ): void {
    const logger = new Logger(this.userPermission);
    logger.log(action);
  }

  private checkAccess(userPermission: string) {
    if (userPermission !== 'admin') throw Error('NO_PERMISSION')
  }
}

//direct access
const logger = new Logger('user');
logger.log('Logger: Delete payment resource ID 123');
//proxy access;
const loggerProxy = new LoggerProxy('user');
loggerProxy.log('Proxy: Delete payment resource ID 123')



