// C/C++ 头文件和函数数据
// 全局变量，供main.js使用
const headersData = {
    // C 标准头文件
    c_headers: [
        {
            name: "<stdio.h>",
            description: "标准输入输出函数库",
            functions: [
                {
                    name: "printf",
                    signature: "int printf(const char *format, ...)",
                    description: "格式化输出到标准输出流",
                    parameters: [
                        { name: "format", description: "格式化字符串" },
                        { name: "...", description: "可变参数列表" }
                    ],
                    returnValue: "返回成功写入的字符数，失败返回负值"
                },
                {
                    name: "scanf",
                    signature: "int scanf(const char *format, ...)",
                    description: "从标准输入流读取格式化输入",
                    parameters: [
                        { name: "format", description: "格式化字符串" },
                        { name: "...", description: "可变参数列表（指针）" }
                    ],
                    returnValue: "返回成功读取的项数，失败或到达文件末尾返回EOF"
                },
                {
                    name: "fopen",
                    signature: "FILE *fopen(const char *filename, const char *mode)",
                    description: "打开文件",
                    parameters: [
                        { name: "filename", description: "文件名" },
                        { name: "mode", description: "打开模式" }
                    ],
                    returnValue: "成功返回文件指针，失败返回NULL"
                },
                {
                    name: "fclose",
                    signature: "int fclose(FILE *stream)",
                    description: "关闭文件",
                    parameters: [
                        { name: "stream", description: "文件指针" }
                    ],
                    returnValue: "成功返回0，失败返回EOF"
                },
                {
                    name: "fgets",
                    signature: "char *fgets(char *str, int n, FILE *stream)",
                    description: "从文件读取一行",
                    parameters: [
                        { name: "str", description: "存储读取字符串的缓冲区" },
                        { name: "n", description: "最大读取字符数" },
                        { name: "stream", description: "文件指针" }
                    ],
                    returnValue: "成功返回str，失败或到达文件末尾返回NULL"
                },
                {
                    name: "fputs",
                    signature: "int fputs(const char *str, FILE *stream)",
                    description: "向文件写入字符串",
                    parameters: [
                        { name: "str", description: "要写入的字符串" },
                        { name: "stream", description: "文件指针" }
                    ],
                    returnValue: "成功返回非负值，失败返回EOF"
                }
            ]
        },
        {
            name: "<stdlib.h>",
            description: "标准库函数",
            functions: [
                {
                    name: "malloc",
                    signature: "void *malloc(size_t size)",
                    description: "动态分配内存",
                    parameters: [
                        { name: "size", description: "要分配的字节数" }
                    ],
                    returnValue: "成功返回指向分配内存的指针，失败返回NULL"
                },
                {
                    name: "free",
                    signature: "void free(void *ptr)",
                    description: "释放动态分配的内存",
                    parameters: [
                        { name: "ptr", description: "要释放的内存指针" }
                    ],
                    returnValue: "无返回值"
                },
                {
                    name: "atoi",
                    signature: "int atoi(const char *nptr)",
                    description: "将字符串转换为整数",
                    parameters: [
                        { name: "nptr", description: "要转换的字符串" }
                    ],
                    returnValue: "返回转换后的整数，转换失败返回0"
                },
                {
                    name: "rand",
                    signature: "int rand(void)",
                    description: "生成伪随机数",
                    parameters: [],
                    returnValue: "返回0到RAND_MAX之间的伪随机整数"
                },
                {
                    name: "srand",
                    signature: "void srand(unsigned int seed)",
                    description: "设置随机数种子",
                    parameters: [
                        { name: "seed", description: "随机数种子" }
                    ],
                    returnValue: "无返回值"
                },
                {
                    name: "system",
                    signature: "int system(const char *command)",
                    description: "执行系统命令",
                    parameters: [
                        { name: "command", description: "要执行的命令字符串" }
                    ],
                    returnValue: "返回命令执行结果"
                }
            ]
        },
        {
            name: "<string.h>",
            description: "字符串处理函数库",
            functions: [
                {
                    name: "strlen",
                    signature: "size_t strlen(const char *s)",
                    description: "计算字符串长度",
                    parameters: [
                        { name: "s", description: "要计算长度的字符串" }
                    ],
                    returnValue: "返回字符串的长度（不包括终止符'\0'）"
                },
                {
                    name: "strcpy",
                    signature: "char *strcpy(char *dest, const char *src)",
                    description: "复制字符串",
                    parameters: [
                        { name: "dest", description: "目标字符串" },
                        { name: "src", description: "源字符串" }
                    ],
                    returnValue: "返回dest"
                },
                {
                    name: "strcat",
                    signature: "char *strcat(char *dest, const char *src)",
                    description: "连接字符串",
                    parameters: [
                        { name: "dest", description: "目标字符串" },
                        { name: "src", description: "源字符串" }
                    ],
                    returnValue: "返回dest"
                },
                {
                    name: "strcmp",
                    signature: "int strcmp(const char *s1, const char *s2)",
                    description: "比较字符串",
                    parameters: [
                        { name: "s1", description: "第一个字符串" },
                        { name: "s2", description: "第二个字符串" }
                    ],
                    returnValue: "s1 < s2返回负值，s1 == s2返回0，s1 > s2返回正值"
                },
                {
                    name: "strchr",
                    signature: "char *strchr(const char *s, int c)",
                    description: "查找字符在字符串中第一次出现的位置",
                    parameters: [
                        { name: "s", description: "要搜索的字符串" },
                        { name: "c", description: "要查找的字符" }
                    ],
                    returnValue: "成功返回指向字符的指针，失败返回NULL"
                },
                {
                    name: "strstr",
                    signature: "char *strstr(const char *haystack, const char *needle)",
                    description: "查找子字符串",
                    parameters: [
                        { name: "haystack", description: "要搜索的字符串" },
                        { name: "needle", description: "要查找的子字符串" }
                    ],
                    returnValue: "成功返回指向子字符串的指针，失败返回NULL"
                }
            ]
        },
        {
            name: "<math.h>",
            description: "数学函数库",
            functions: [
                {
                    name: "sqrt",
                    signature: "double sqrt(double x)",
                    description: "计算平方根",
                    parameters: [
                        { name: "x", description: "非负实数" }
                    ],
                    returnValue: "返回x的平方根"
                },
                {
                    name: "pow",
                    signature: "double pow(double base, double exponent)",
                    description: "计算幂",
                    parameters: [
                        { name: "base", description: "底数" },
                        { name: "exponent", description: "指数" }
                    ],
                    returnValue: "返回base的exponent次幂"
                },
                {
                    name: "abs",
                    signature: "int abs(int x)",
                    description: "计算整数绝对值",
                    parameters: [
                        { name: "x", description: "整数" }
                    ],
                    returnValue: "返回x的绝对值"
                },
                {
                    name: "fabs",
                    signature: "double fabs(double x)",
                    description: "计算浮点数绝对值",
                    parameters: [
                        { name: "x", description: "浮点数" }
                    ],
                    returnValue: "返回x的绝对值"
                },
                {
                    name: "sin",
                    signature: "double sin(double x)",
                    description: "计算正弦值",
                    parameters: [
                        { name: "x", description: "弧度角" }
                    ],
                    returnValue: "返回x的正弦值"
                },
                {
                    name: "cos",
                    signature: "double cos(double x)",
                    description: "计算余弦值",
                    parameters: [
                        { name: "x", description: "弧度角" }
                    ],
                    returnValue: "返回x的余弦值"
                },
                {
                    name: "tan",
                    signature: "double tan(double x)",
                    description: "计算正切值",
                    parameters: [
                        { name: "x", description: "弧度角" }
                    ],
                    returnValue: "返回x的正切值"
                }
            ]
        },
        {
            name: "<time.h>",
            description: "时间函数库",
            functions: [
                {
                    name: "time",
                    signature: "time_t time(time_t *t)",
                    description: "获取当前时间",
                    parameters: [
                        { name: "t", description: "存储时间的指针（可为NULL）" }
                    ],
                    returnValue: "返回当前时间（自1970-01-01 00:00:00 UTC以来的秒数）"
                },
                {
                    name: "ctime",
                    signature: "char *ctime(const time_t *timep)",
                    description: "将时间转换为字符串",
                    parameters: [
                        { name: "timep", description: "指向time_t类型的指针" }
                    ],
                    returnValue: "返回格式化的时间字符串"
                },
                {
                    name: "localtime",
                    signature: "struct tm *localtime(const time_t *timep)",
                    description: "将时间转换为本地时间结构",
                    parameters: [
                        { name: "timep", description: "指向time_t类型的指针" }
                    ],
                    returnValue: "返回指向struct tm的指针"
                },
                {
                    name: "asctime",
                    signature: "char *asctime(const struct tm *tm)",
                    description: "将tm结构转换为字符串",
                    parameters: [
                        { name: "tm", description: "指向struct tm的指针" }
                    ],
                    returnValue: "返回格式化的时间字符串"
                }
            ]
        }
    ],
    
    // C++ 标准头文件
    cpp_headers: [
        {
            name: "<iostream>",
            description: "标准输入输出流",
            functions: [
                {
                    name: "cout",
                    signature: "std::ostream cout",
                    description: "标准输出流对象",
                    parameters: [],
                    returnValue: "返回ostream对象的引用"
                },
                {
                    name: "cin",
                    signature: "std::istream cin",
                    description: "标准输入流对象",
                    parameters: [],
                    returnValue: "返回istream对象的引用"
                },
                {
                    name: "cerr",
                    signature: "std::ostream cerr",
                    description: "标准错误输出流对象",
                    parameters: [],
                    returnValue: "返回ostream对象的引用"
                }
            ]
        },
        {
            name: "<vector>",
            description: "动态数组容器",
            functions: [
                {
                    name: "vector::push_back",
                    signature: "void push_back(const T& value)",
                    description: "在向量末尾添加元素",
                    parameters: [
                        { name: "value", description: "要添加的元素值" }
                    ],
                    returnValue: "无返回值"
                },
                {
                    name: "vector::pop_back",
                    signature: "void pop_back()",
                    description: "移除向量末尾元素",
                    parameters: [],
                    returnValue: "无返回值"
                },
                {
                    name: "vector::size",
                    signature: "size_type size() const",
                    description: "获取向量大小",
                    parameters: [],
                    returnValue: "返回向量中元素的数量"
                },
                {
                    name: "vector::empty",
                    signature: "bool empty() const",
                    description: "检查向量是否为空",
                    parameters: [],
                    returnValue: "向量为空返回true，否则返回false"
                },
                {
                    name: "vector::clear",
                    signature: "void clear()",
                    description: "清空向量",
                    parameters: [],
                    returnValue: "无返回值"
                },
                {
                    name: "vector::begin",
                    signature: "iterator begin()",
                    description: "获取向量起始迭代器",
                    parameters: [],
                    returnValue: "返回指向第一个元素的迭代器"
                },
                {
                    name: "vector::end",
                    signature: "iterator end()",
                    description: "获取向量结束迭代器",
                    parameters: [],
                    returnValue: "返回指向最后一个元素之后的迭代器"
                }
            ]
        },
        {
            name: "<string>",
            description: "字符串类",
            functions: [
                {
                    name: "string::length",
                    signature: "size_t length() const",
                    description: "获取字符串长度",
                    parameters: [],
                    returnValue: "返回字符串的长度"
                },
                {
                    name: "string::empty",
                    signature: "bool empty() const",
                    description: "检查字符串是否为空",
                    parameters: [],
                    returnValue: "字符串为空返回true，否则返回false"
                },
                {
                    name: "string::append",
                    signature: "string& append(const string& str)",
                    description: "追加字符串",
                    parameters: [
                        { name: "str", description: "要追加的字符串" }
                    ],
                    returnValue: "返回字符串对象的引用"
                },
                {
                    name: "string::substr",
                    signature: "string substr(size_t pos = 0, size_t len = npos) const",
                    description: "获取子字符串",
                    parameters: [
                        { name: "pos", description: "起始位置（默认0）" },
                        { name: "len", description: "子串长度（默认到末尾）" }
                    ],
                    returnValue: "返回子字符串"
                },
                {
                    name: "string::find",
                    signature: "size_t find(const string& str, size_t pos = 0) const",
                    description: "查找子字符串",
                    parameters: [
                        { name: "str", description: "要查找的子字符串" },
                        { name: "pos", description: "起始查找位置（默认0）" }
                    ],
                    returnValue: "成功返回子串位置，失败返回string::npos"
                },
                {
                    name: "string::c_str",
                    signature: "const char* c_str() const",
                    description: "获取C风格字符串指针",
                    parameters: [],
                    returnValue: "返回指向C风格字符串的指针"
                }
            ]
        },
        {
            name: "<algorithm>",
            description: "算法库",
            functions: [
                {
                    name: "sort",
                    signature: "void sort(RandomIt first, RandomIt last)",
                    description: "排序元素",
                    parameters: [
                        { name: "first", description: "起始迭代器" },
                        { name: "last", description: "结束迭代器" }
                    ],
                    returnValue: "无返回值"
                },
                {
                    name: "find",
                    signature: "InputIt find(InputIt first, InputIt last, const T& value)",
                    description: "查找元素",
                    parameters: [
                        { name: "first", description: "起始迭代器" },
                        { name: "last", description: "结束迭代器" },
                        { name: "value", description: "要查找的值" }
                    ],
                    returnValue: "成功返回指向元素的迭代器，失败返回last"
                },
                {
                    name: "reverse",
                    signature: "void reverse(BidirIt first, BidirIt last)",
                    description: "反转元素顺序",
                    parameters: [
                        { name: "first", description: "起始迭代器" },
                        { name: "last", description: "结束迭代器" }
                    ],
                    returnValue: "无返回值"
                },
                {
                    name: "min",
                    signature: "const T& min(const T& a, const T& b)",
                    description: "返回最小值",
                    parameters: [
                        { name: "a", description: "第一个值" },
                        { name: "b", description: "第二个值" }
                    ],
                    returnValue: "返回a和b中的较小值"
                },
                {
                    name: "max",
                    signature: "const T& max(const T& a, const T& b)",
                    description: "返回最大值",
                    parameters: [
                        { name: "a", description: "第一个值" },
                        { name: "b", description: "第二个值" }
                    ],
                    returnValue: "返回a和b中的较大值"
                }
            ]
        },
        {
            name: "<map>",
            description: "关联数组容器",
            functions: [
                {
                    name: "map::insert",
                    signature: "pair<iterator,bool> insert(const value_type& value)",
                    description: "插入元素",
                    parameters: [
                        { name: "value", description: "要插入的键值对" }
                    ],
                    returnValue: "返回pair，first是迭代器，second表示是否插入成功"
                },
                {
                    name: "map::find",
                    signature: "iterator find(const Key& key)",
                    description: "查找元素",
                    parameters: [
                        { name: "key", description: "要查找的键" }
                    ],
                    returnValue: "成功返回指向元素的迭代器，失败返回end()"
                },
                {
                    name: "map::erase",
                    signature: "size_type erase(const Key& key)",
                    description: "删除元素",
                    parameters: [
                        { name: "key", description: "要删除的键" }
                    ],
                    returnValue: "返回删除的元素数量"
                },
                {
                    name: "map::size",
                    signature: "size_type size() const",
                    description: "获取map大小",
                    parameters: [],
                    returnValue: "返回map中元素的数量"
                },
                {
                    name: "map::empty",
                    signature: "bool empty() const",
                    description: "检查map是否为空",
                    parameters: [],
                    returnValue: "map为空返回true，否则返回false"
                }
            ]
        },
        {
            name: "<set>",
            description: "集合容器",
            functions: [
                {
                    name: "set::insert",
                    signature: "pair<iterator,bool> insert(const value_type& value)",
                    description: "插入元素",
                    parameters: [
                        { name: "value", description: "要插入的值" }
                    ],
                    returnValue: "返回pair，first是迭代器，second表示是否插入成功"
                },
                {
                    name: "set::find",
                    signature: "iterator find(const Key& key)",
                    description: "查找元素",
                    parameters: [
                        { name: "key", description: "要查找的值" }
                    ],
                    returnValue: "成功返回指向元素的迭代器，失败返回end()"
                },
                {
                    name: "set::erase",
                    signature: "size_type erase(const Key& key)",
                    description: "删除元素",
                    parameters: [
                        { name: "key", description: "要删除的值" }
                    ],
                    returnValue: "返回删除的元素数量"
                },
                {
                    name: "set::size",
                    signature: "size_type size() const",
                    description: "获取set大小",
                    parameters: [],
                    returnValue: "返回set中元素的数量"
                },
                {
                    name: "set::empty",
                    signature: "bool empty() const",
                    description: "检查set是否为空",
                    parameters: [],
                    returnValue: "set为空返回true，否则返回false"
                }
            ]
        }
    ]
};

// 确保headersData被正确加载
if (typeof window !== 'undefined') {
    window.headersData = headersData;
}