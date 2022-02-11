package com.seongjang.factory.util;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.dialect.AbstractDialect;
import org.thymeleaf.dialect.IExpressionObjectDialect;
import org.thymeleaf.expression.IExpressionObjectFactory;

@Component
public class SeongJangUtilsDialect extends AbstractDialect implements IExpressionObjectDialect {

	protected SeongJangUtilsDialect() {
		super("seongjangUtils");
	}

    @Override
    public IExpressionObjectFactory getExpressionObjectFactory() {
        return new IExpressionObjectFactory() {
            @Override
            public Set<String> getAllExpressionObjectNames() {
                return Collections.singleton("seongjangUtils");
            }

            @Override
            public Object buildObject(IExpressionContext context, String expressionObjectName) {
                return new EnterUtils();
            }

            @Override
            public boolean isCacheable(String expressionObjectName) {
                return true;
            }
        };
    }

    public class EnterUtils {

    	public String addDays(int days , String dateFormat) {

    		DateFormat df = new SimpleDateFormat(StringUtils.defaultIfEmpty(dateFormat, "yyyy-MM-dd"));
    		Calendar cal =new GregorianCalendar(Locale.KOREA);
    		cal.setTime(new Date());
    		cal.add(Calendar.DATE,days);

    		return df.format(cal.getTime());
    	}

    	public String drawPagination(PaginationInfo paginationInfo ,String contextPath, String jsFunction) {
    		PaginationRender render = new PaginationRender();
    		return render.renderPagination(paginationInfo, contextPath, jsFunction);
    	}
    	public String phoneNumberFormat(String phoneNo) {
    		if (phoneNo == null) {
    		      return "";
    		    }
    		    if (phoneNo.length() == 8) {
    		      return phoneNo.replaceFirst("^([0-9]{4})([0-9]{4})$", "$1-$2");
    		    } else if (phoneNo.length() == 12) {
    		      return phoneNo.replaceFirst("(^[0-9]{4})([0-9]{4})([0-9]{4})$", "$1-$2-$3");
    		    }
    		    return phoneNo.replaceFirst("(^02|[0-9]{3})([0-9]{3,4})([0-9]{4})$", "$1-$2-$3");
    	}
    	public String ageFormat(String birthDay) {
    		if (birthDay == null || birthDay.length() != 8) {
    		      return "-";
    		} else {
    			SimpleDateFormat  formatter = new SimpleDateFormat("yyyy");
    			String yyyy = formatter.format(new Date());
    			return String.valueOf(Integer.parseInt(yyyy) - Integer.parseInt(birthDay.substring(0,4)));
    		}
    	}
    	public String unEscapeHtml(String html) {
    		if (html != null && !html.equals("")) {
	    	String escapeHtml =  HtmlUtil.unEscapeHtml(html);
				return HtmlUtil.stripXSS(escapeHtml);
    		}else {
    			return "";
    		}
    	}
    	public String byteCalculation(String bytes) {

          String retFormat = "0";
          Double size = Double.parseDouble(bytes);
          String[] s = { "bytes", "KB", "MB", "GB", "TB", "PB" };
          if (size != 0d) {
                int idx = (int) Math.floor(Math.log(size) / Math.log(1024));
                DecimalFormat df = new DecimalFormat("#,###.##");
                double ret = ((size / Math.pow(1024, Math.floor(idx))));
                retFormat = df.format(ret) + "  " + s[idx];
           } else {
                retFormat += " " + s[0];
           }
              return retFormat;

    	}


    	public String filenameExtensionStyle(String filePath) {
    		if(!org.springframework.util.StringUtils.isEmpty(filePath)) {
    			String cssString="";
    			switch(org.springframework.util.StringUtils.getFilenameExtension(filePath)) {
    				case "xls":cssString="icon-file excel";
    							break;
    				case "xlsx":cssString="icon-file excel";
								break;
    				case "csv":cssString="icon-file excel";
								break;
    				case "pdf":	cssString="icon-file pdf";
    							break;
    				case "ppt":	cssString="icon-file ppt";
    							break;
    				case "txt":	cssString="icon-file txt";
    							break;
    				case "doc":cssString="icon-file word";
    							break;
    				case "docx":cssString="icon-file word";
								break;
    				case "hwp":	cssString="icon-file hwp";
    							break;
    				case "mp3":	cssString="icon-file video";
								break;
    				case "wav":	cssString="icon-file video";
								break;
    				case "mp4":	cssString="icon-file video";
								break;
    				case "avi":	cssString="icon-file video";
								break;
    				case "webm":cssString="icon-file video";
								break;
    				case "pptx":cssString="icon-file ppt";
					            break;
					case "jpg": cssString="icon-file img";
					            break;
					case "png": cssString="icon-file img";
					            break;
					case "gif": cssString="icon-file img";
					            break;
					case "bmp": cssString="icon-file img";
					           break;
    				default:cssString="icon-file";
    			}
    			return cssString;
    		}else {
    			return "icon-file";
    		}

    	}

    	public String durationTimeFormat(String duration) {
    		String [] result;
    		String returnVal="";
    		try{
    			result = duration.split(":");
    			int summary =  Integer.parseInt(result[0])*60 + Integer.parseInt(result[1]) + ((int)Float.parseFloat(result[2]) > 30 ? 1 : 0);
    			returnVal =  String.valueOf(summary);
    		}catch(Exception e) {
    			returnVal ="";
    		}
            return returnVal;
      	}


    	public String maskAsterisk(String param) {
    		if(!org.springframework.util.StringUtils.isEmpty(param)) {
    			return StringUtils.leftPad("",param.length(),"*");
    		}
    		return "";
      	}

    }
}

