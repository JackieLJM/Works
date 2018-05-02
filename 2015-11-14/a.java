class ThreadA extends Thread //定义ThreadA类继承Thread类
{
    int count=1;
    int num;
    public ThreadA(int newNum)
    {
        num=newNum;
        System.out.println("创建线程"+num);
    }
    public void run()   //覆盖Thread类里的run（）方法
    {
        while(count<=3)
        {
            System.out.println("线程"+num+"：计数"+count);
            count++;
//            if(count==3)
//                break;
        }
        this.sleep();
    }
    public static void main(String[] args)
    {
        ThreadA a1 = new ThreadA(1);
        ThreadA a2 = new ThreadA(2);
        ThreadA a3 = new ThreadA(3);
        
        a1.start();
//        a1.wait(1);
        a2.start();
//        a2.wait(1);
        a3.start();
//        a3.wait(1);
        
        System.out.println("主方法main()运行结束!");
    }
}