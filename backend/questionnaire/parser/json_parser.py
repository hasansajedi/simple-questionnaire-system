import json
import os
import logging
from jsonpath_rw import parse

from questionnaire.models import QA, Questionnaire


class json_parser:
    json_data = None
    logger = None

    def __init__(self):
        FORMAT = '%(message)s'
        logging.basicConfig(format=FORMAT)
        self.logger = logging.getLogger('tcpserver')
        try:
            with open(os.path.dirname(__file__) + '/QA.json') as f:
                self.json_data = json.load(f)
        except:
            self.logger.error("error")

    def get_xpath_values(self, xpaths, **kw):
        answers = ''
        lst = []
        try:
            get_my_value = parse(xpaths)
            result = [match.value for match in get_my_value.find(self.json_data)]
            if isinstance(result, list):
                for ss in result:
                    if isinstance(ss, dict):
                        if ss.get("response") is not None:
                            for c in ss.get("response").replace('(', '').replace(')', '').replace('\'', '').split('/'):
                                answers += c + ","
                        lst.append(QA(pid=ss.get("pid"),
                                           title=ss.get("title"),
                                           response=answers[0:-1],
                                           is_last=ss.get("is_last"),
                                           path=xpaths))
                        if not ss.get("is_last"):
                            self.logger.info(answers)
                return lst
            else:
                return None
        except:
            self.logger.error("error")
        return None

    def get_questionnaires(self):
        lst = []
        try:
            with open(os.path.dirname(__file__) + '/questionnaire.json') as f:
                json_data = json.load(f)
            for s in json_data.values():
                for ss in s:
                    lst.append(Questionnaire(id=ss.get("id"),
                                                  title=ss.get("title"),
                                                  content=ss.get("content")))
        except:
            self.logger.error("error")
        return lst

# jp = json_parser()
# print(jp.get_xpath_values(xpaths='$.questionnaire.q1.question_number_1'))
# x = (jp.get_xpath_values(xpaths='$.questionnaire.q1.question_number_1.No'))[0]
# print(x.path)
# print(jp.get_questionnaires())
