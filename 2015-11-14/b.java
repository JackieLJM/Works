class ThreadSale extends Thread         //创建一个Thread子类。模拟航班售票窗口
{
    private int tickets=10;        //私有变量tickets代表机票数，是共享数据
    public void run()
    {
        while(true)
        {
            if(tickets>0)        //如果有票可售
                System.out.println(getName()+"  售机票第"+tickets--+"号");
            else
                System.exit(0);
        }
    }
}

public class App11_4   //创建其他类，在它的main()方法中创建并启动3个线程对象
{
    public static void main(String[] args)
    {
        ThreadSale t1=new ThreadSale();   //创建3个Thread类的子类的对象
        ThreadSale t2=new ThreadSale();
        ThreadSale t3=new ThreadSale();
        t1.start();
        t2.start();
        t3.start();
    }
}